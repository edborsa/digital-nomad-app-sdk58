import { Category } from "../../../../../domain/category/Category";

// Keyed by id, so seed data that names a category that does not exist fails to compile
export const categoriesById = {
  star: {
    id: "star",
    code: "FAVORITE",
    name: "Destaques",
    description: "Os preferidos dos viajantes",
  },
  urban: {
    id: "urban",
    code: "URBAN",
    name: "Urbano",
    description: "Explore a vida na cidade",
  },
  beach: {
    id: "beach",
    code: "BEACH",
    name: "Praia",
    description: "Sombra e água fresca",
  },
  nature: {
    id: "nature",
    code: "NATURE",
    name: "Natureza",
    description: "Os melhores destinos para descansar",
  },
  culture: {
    id: "culture",
    code: "CULTURE",
    name: "Cultura",
    description: "Riqueza cultural e tradições",
  },
  shopping: {
    id: "shopping",
    code: "SHOPPING",
    name: "Compras",
    description: "Destinos para quem adora fazer compras",
  },
  history: {
    id: "history",
    code: "HISTORY",
    name: "História",
    description: "Cidades ricas em história e patrimônio",
  },
  adventure: {
    id: "adventure",
    code: "ADVENTURE",
    name: "Aventura",
    description: "Os melhores lugares para aventura",
  },
  luxury: {
    id: "luxury",
    code: "LUXURY",
    name: "Luxo",
    description: "Experiências de viagem de luxo",
  },
  gastronomy: {
    id: "gastronomy",
    code: "GASTRONOMY",
    name: "Gastronomia",
    description: "Explore a culinária local",
  },
} satisfies Record<string, Category>;

export const categories: Category[] = Object.values(categoriesById);
