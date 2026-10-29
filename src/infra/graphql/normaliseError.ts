import { APP_ERROR_CODES, AppError, AppErrorCode } from "@/src/domain/AppError";

// Ash's two error shapes: mutations return { result, errors } as data, while
// reads fail with top-level GraphQL errors carrying details under extensions
type MutationResultError = {
  message?: string | null;
  code?: string | null;
  fields?: string[] | null;
};

type TopLevelError = {
  message: string;
  extensions?: { code?: string; fields?: string[] };
};

export type GraphQLResponse = {
  data?: Record<string, unknown> | null;
  errors?: TopLevelError[];
};

function toAppErrorCode(code: string | null | undefined): AppErrorCode {
  // Ash reports validation problems with specific codes, e.g. invalid_attribute or required
  if (code?.startsWith("invalid") || code === "required") {
    return "invalid";
  }
  return APP_ERROR_CODES.find((known) => known === code) ?? "unknown";
}

function isMutationResult(
  value: unknown,
): value is { errors: MutationResultError[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { errors?: unknown }).errors)
  );
}

/** The first error a response carries as an AppError, or null when it has none */
export function normaliseError(response: GraphQLResponse): AppError | null {
  const topLevel = response.errors?.[0];
  if (topLevel) {
    return new AppError(
      toAppErrorCode(topLevel.extensions?.code),
      topLevel.message,
      topLevel.extensions?.fields,
    );
  }

  for (const value of Object.values(response.data ?? {})) {
    const mutationError = isMutationResult(value) ? value.errors[0] : undefined;
    if (mutationError) {
      return new AppError(
        toAppErrorCode(mutationError.code),
        mutationError.message ?? "something went wrong",
        mutationError.fields ?? undefined,
      );
    }
  }

  return null;
}
