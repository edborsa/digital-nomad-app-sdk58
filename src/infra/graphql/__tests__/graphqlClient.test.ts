import { AppError } from "@/src/domain/AppError";
import { useSessionStore } from "@/src/domain/auth/useSessionStore";
import { Feedback } from "@/src/infra/feedbackService/IFeedbackService";
import { queryClientOptions } from "@/src/test-utils/queryClientOptions";
import { QueryClient } from "@tanstack/react-query";
import { createGraphQLClient } from "../graphqlClient";
import {
  CityQuery,
  ToggleFavoriteCityMutation,
} from "../__fixtures__/documents";

const ENDPOINT = "https://api.example.test/gql";

function respondWith(body: unknown, status = 200) {
  return jest.fn(
    async (_input: RequestInfo | URL, _init?: RequestInit) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
  );
}

function setup(fetchFn: typeof fetch) {
  const queryClient = new QueryClient(queryClientOptions);
  const sentFeedback: Feedback[] = [];
  const client = createGraphQLClient({
    endpoint: ENDPOINT,
    fetch: fetchFn,
    queryClient,
    feedback: { send: (feedback) => sentFeedback.push(feedback) },
  });
  return { client, queryClient, sentFeedback };
}

async function executeAndCatch(promise: Promise<unknown>) {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("expected the operation to fail");
}

describe("GraphQL client", () => {
  beforeEach(() => {
    useSessionStore.getState().signIn("session-token");
  });

  it("should return the typed data and send the Session token as a bearer credential", async () => {
    const fetchFn = respondWith({
      data: {
        city: { id: "1", name: "Rio de Janeiro", country: "Brasil" },
      },
    });
    const { client } = setup(fetchFn);

    const data = await client.execute(CityQuery, { id: "1" });

    expect(data.city?.name).toBe("Rio de Janeiro");
    const [url, init] = fetchFn.mock.calls[0]!;
    expect(url).toBe(ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).get("Authorization")).toBe(
      "Bearer session-token",
    );
    expect(JSON.parse(String(init?.body))).toEqual({
      query: CityQuery.toString(),
      variables: { id: "1" },
    });
  });

  it("should send no credential when signed out", async () => {
    useSessionStore.getState().signOut();
    const fetchFn = respondWith({ data: { city: null } });
    const { client } = setup(fetchFn);

    await client.execute(CityQuery, { id: "1" });

    const init = fetchFn.mock.calls[0]![1];
    expect(new Headers(init?.headers).has("Authorization")).toBe(false);
  });

  it("should turn a mutation-result error into an AppError", async () => {
    const { client } = setup(
      respondWith({
        data: {
          toggleFavoriteCity: {
            result: null,
            errors: [
              {
                message: "city not found",
                shortMessage: "not found",
                code: "not_found",
                fields: ["city_id"],
              },
            ],
          },
        },
      }),
    );

    const error = await executeAndCatch(
      client.execute(ToggleFavoriteCityMutation, { cityId: "99" }),
    );

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      code: "not_found",
      message: "city not found",
      fields: ["city_id"],
    });
  });

  it("should turn a top-level GraphQL error into an AppError", async () => {
    const { client } = setup(
      respondWith({
        data: null,
        errors: [
          {
            message: "invalid id",
            path: ["city"],
            extensions: { code: "invalid_argument", fields: ["id"] },
          },
        ],
      }),
    );

    const error = await executeAndCatch(client.execute(CityQuery, { id: "" }));

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      code: "invalid",
      message: "invalid id",
      fields: ["id"],
    });
  });

  it("should end the Session, clear the cache and say so on an auth error", async () => {
    const { client, queryClient, sentFeedback } = setup(
      respondWith({
        data: null,
        errors: [
          {
            message: "token expired",
            extensions: { code: "unauthenticated" },
          },
        ],
      }),
    );
    queryClient.setQueryData(["user"], { fullname: "Lucas Garcez" });

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toMatchObject({ code: "unauthenticated" });
    expect(useSessionStore.getState().status).toBe("signedOut");
    expect(useSessionStore.getState().token).toBeNull();
    expect(queryClient.getQueryData(["user"])).toBeUndefined();
    expect(sentFeedback).toEqual([
      expect.objectContaining({ type: "error", message: "sessão expirada" }),
    ]);
  });

  it("should treat an HTTP 401 as an auth error", async () => {
    const { client, queryClient, sentFeedback } = setup(
      respondWith({ message: "unauthorized" }, 401),
    );
    queryClient.setQueryData(["user"], { fullname: "Lucas Garcez" });

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toMatchObject({ code: "unauthenticated" });
    expect(useSessionStore.getState().status).toBe("signedOut");
    expect(queryClient.getQueryData(["user"])).toBeUndefined();
    expect(sentFeedback).toHaveLength(1);
  });

  it("should say the Session expired only once when several requests fail together", async () => {
    const { client, sentFeedback } = setup(
      respondWith({ message: "unauthorized" }, 401),
    );

    await Promise.allSettled([
      client.execute(CityQuery, { id: "1" }),
      client.execute(CityQuery, { id: "2" }),
    ]);

    expect(sentFeedback).toHaveLength(1);
  });

  it("should not report a failed response without GraphQL errors as success", async () => {
    const { client } = setup(
      respondWith({ message: "internal server error" }, 500),
    );

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({ code: "unknown" });
  });

  it("should turn a failed request into a network AppError", async () => {
    const { client } = setup(
      jest.fn(async () => {
        throw new TypeError("Network request failed");
      }),
    );

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({ code: "network" });
    expect(useSessionStore.getState().status).toBe("signedIn");
  });

  it("should report an error code it doesn't know as unknown", async () => {
    const { client } = setup(
      respondWith({ data: null, errors: [{ message: "boom" }] }),
    );

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toMatchObject({ code: "unknown", message: "boom" });
  });

  it("should report a response that isn't JSON as an unknown AppError", async () => {
    const { client } = setup(
      jest.fn(
        async () => new Response("<html>Bad Gateway</html>", { status: 502 }),
      ),
    );

    const error = await executeAndCatch(client.execute(CityQuery, { id: "1" }));

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({ code: "unknown" });
  });
});
