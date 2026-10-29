/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type CityQueryVariables = Exact<{
  id: string | number;
}>;


export type CityQuery = { city: { id: string, name: string, country: string } | null };

export type ToggleFavoriteCityMutationVariables = Exact<{
  cityId: string | number;
}>;


export type ToggleFavoriteCityMutation = { toggleFavoriteCity: { result: { id: string, isFavorite: boolean } | null, errors: Array<{ message: string | null, shortMessage: string | null, code: string | null, fields: Array<string> | null }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CityDocument = new TypedDocumentString(`
    query City($id: ID!) {
  city(id: $id) {
    id
    name
    country
  }
}
    `) as unknown as TypedDocumentString<CityQuery, CityQueryVariables>;
export const ToggleFavoriteCityDocument = new TypedDocumentString(`
    mutation ToggleFavoriteCity($cityId: ID!) {
  toggleFavoriteCity(input: { cityId: $cityId }) {
    result {
      id
      isFavorite
    }
    errors {
      message
      shortMessage
      code
      fields
    }
  }
}
    `) as unknown as TypedDocumentString<ToggleFavoriteCityMutation, ToggleFavoriteCityMutationVariables>;