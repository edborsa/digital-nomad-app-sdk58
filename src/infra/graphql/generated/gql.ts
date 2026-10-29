/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query City($id: ID!) {\n    city(id: $id) {\n      id\n      name\n      country\n    }\n  }\n": typeof types.CityDocument,
    "\n  mutation ToggleFavoriteCity($cityId: ID!) {\n    toggleFavoriteCity(input: { cityId: $cityId }) {\n      result {\n        id\n        isFavorite\n      }\n      errors {\n        message\n        shortMessage\n        code\n        fields\n      }\n    }\n  }\n": typeof types.ToggleFavoriteCityDocument,
};
const documents: Documents = {
    "\n  query City($id: ID!) {\n    city(id: $id) {\n      id\n      name\n      country\n    }\n  }\n": types.CityDocument,
    "\n  mutation ToggleFavoriteCity($cityId: ID!) {\n    toggleFavoriteCity(input: { cityId: $cityId }) {\n      result {\n        id\n        isFavorite\n      }\n      errors {\n        message\n        shortMessage\n        code\n        fields\n      }\n    }\n  }\n": types.ToggleFavoriteCityDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query City($id: ID!) {\n    city(id: $id) {\n      id\n      name\n      country\n    }\n  }\n"): typeof import('./graphql').CityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleFavoriteCity($cityId: ID!) {\n    toggleFavoriteCity(input: { cityId: $cityId }) {\n      result {\n        id\n        isFavorite\n      }\n      errors {\n        message\n        shortMessage\n        code\n        fields\n      }\n    }\n  }\n"): typeof import('./graphql').ToggleFavoriteCityDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
