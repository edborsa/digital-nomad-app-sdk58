# Supabase removed; in-memory adapters until the Ash backend

The backend will be Elixir/Phoenix with Ash Framework (AshGraphql, AshAuthentication) on Postgres, so Supabase is removed entirely rather than kept as a stopgap. Until the GraphQL adapter exists, the in-memory repository adapters (the ones the integration tests already use) are wired in as the app's working backend. Every screen and every Maestro flow keeps working, and the GraphQL adapter later replaces them behind the same `ICityRepo` / `IAuthRepo` / `ICategoryRepo` interfaces without touching the UI.

## Consequences

Until the Ash backend is connected, data doesn't persist across reinstalls and auth is simulated. The Maestro flows sign in with a user seeded in the in-memory data, not a real account. Supabase-specific concerns are gone, such as session size limits in secure storage. The only credential to plan for is the Ash JWT.
