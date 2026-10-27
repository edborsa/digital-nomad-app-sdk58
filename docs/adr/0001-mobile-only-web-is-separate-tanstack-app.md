# Mobile only: web is a separate TanStack Start app

This repo builds only the iOS and Android apps. The web version of the product will be a separate TanStack Start app that talks to the same Ash GraphQL API, so `react-native-web`, `react-dom` and Expo web support are removed here. Expo web would have given one codebase, but its output is a single-page app built from native-style components, which is weak for what a course product needs on the web: public, SEO-friendly landing pages and content-heavy reading.

## Consequences

The two apps share no code for now. Each one generates its own types from the shared Ash GraphQL schema, which keeps them consistent. A monorepo sharing Zod schemas, domain types or GraphQL documents can be considered once the web app exists, as its own effort.
