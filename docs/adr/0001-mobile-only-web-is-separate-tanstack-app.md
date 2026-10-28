# Mobile only: web is a separate TanStack Start app

This repo builds only the iOS and Android apps. The web version of the product will be a separate TanStack Start app that talks to the same Ash GraphQL API, so `react-native-web`, `react-dom` and Expo web support are removed here. Expo web would have given one codebase, but its output is a single-page app built from native-style components, which is weak for what a course product needs on the web: public, SEO-friendly landing pages and content-heavy reading.

## Consequences

The two apps share no code for now. Each one generates its own types from the shared Ash GraphQL schema, which keeps them consistent. A monorepo sharing Zod schemas, domain types or GraphQL documents can be considered once the web app exists, as its own effort.

`react-dom` came back as a dependency at Expo SDK 54, pinned to React's version. expo-router 6 bundles Radix tabs (`@radix-ui/react-tabs`), which requires it as a peer; left unpinned, npm picks the newest `react-dom`, which needs a newer React than the SDK uses. It is a transitive requirement only: there is still no web target, web config or `react-native-web` dependency.

At SDK 55 this still holds: expo-router 55 still bundles Radix tabs, and `react-dom` moves with React to 19.2.0.

At SDK 56 it still holds: expo-router 56 still bundles Radix tabs, and `react-dom` moves with React to 19.2.3.
