import { graphql } from "../generated";

// Operations against the fixture schema, standing in for the future adapter's documents
export const CityQuery = graphql(`
  query City($id: ID!) {
    city(id: $id) {
      id
      name
      country
    }
  }
`);

export const ToggleFavoriteCityMutation = graphql(`
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
`);
