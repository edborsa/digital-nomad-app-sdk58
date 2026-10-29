import { AppError } from "@/src/domain/AppError";
import { endSession } from "@/src/domain/auth/endSession";
import { useSessionStore } from "@/src/domain/auth/useSessionStore";
import { QueryClient } from "@tanstack/react-query";
import { IFeedbackService } from "../feedbackService/IFeedbackService";
import { TypedDocumentString } from "./generated/graphql";
import { GraphQLResponse, normaliseError } from "./normaliseError";

type GraphQLClientConfig = {
  endpoint: string;
  fetch?: typeof fetch;
  queryClient: QueryClient;
  feedback: IFeedbackService;
};

// Operations without variables are generated with an index signature; theirs is optional
type VariablesArgs<TVariables> = string extends keyof TVariables
  ? [variables?: TVariables]
  : [variables: TVariables];

export type GraphQLClient = {
  /** Resolves with the operation's data, or rejects with an AppError */
  execute: <TResult, TVariables>(
    document: TypedDocumentString<TResult, TVariables>,
    ...[variables]: VariablesArgs<TVariables>
  ) => Promise<TResult>;
};

// Runs Codegen's typed documents over plain fetch; TanStack Query stays the only cache
export function createGraphQLClient({
  endpoint,
  fetch: fetchFn = fetch,
  queryClient,
  feedback,
}: GraphQLClientConfig): GraphQLClient {
  function expireSession() {
    // Several requests can fail together; only the first ends the Session and says so
    if (useSessionStore.getState().status !== "signedIn") {
      return;
    }
    endSession(queryClient);
    feedback.send({
      type: "error",
      message: "sessão expirada",
      description: "entre novamente para continuar",
    });
  }

  return {
    async execute<TResult, TVariables>(
      document: TypedDocumentString<TResult, TVariables>,
      ...[variables]: VariablesArgs<TVariables>
    ): Promise<TResult> {
      const { token } = useSessionStore.getState();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json, application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      let response: Response;
      try {
        response = await fetchFn(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ query: document.toString(), variables }),
        });
      } catch (error) {
        throw new AppError(
          "network",
          error instanceof Error ? error.message : "network request failed",
        );
      }

      if (response.status === 401) {
        expireSession();
        throw new AppError("unauthenticated", "session expired");
      }

      let body: GraphQLResponse;
      try {
        body = await response.json();
      } catch {
        throw new AppError(
          "unknown",
          `unexpected response (${response.status})`,
        );
      }

      const error = normaliseError(body);
      if (error?.code === "unauthenticated") {
        expireSession();
      }
      if (error) {
        throw error;
      }
      if (!response.ok || !body.data) {
        throw new AppError(
          "unknown",
          `unexpected response (${response.status})`,
        );
      }

      return body.data as TResult;
    },
  };
}
