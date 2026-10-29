import { City, CityPreview } from "@/src/domain/city/City";
import {
  CitiesGroupedByCategory,
  CityFindAllFilters,
  CityToggleFavoriteParams,
  ICityRepo,
} from "@/src/domain/city/ICityRepo";
import { categories } from "@/src/infra/repositories/adapters/inMemory/data/categories";
import { cities } from "@/src/infra/repositories/adapters/inMemory/data/cities";

export class InMemoryCityRepo implements ICityRepo {
  async findGroupedByCategory(): Promise<CitiesGroupedByCategory[]> {
    // A category appears once (Explore keys its list by category), holding every city in it
    return categories.flatMap((category) => {
      const citiesInCategory = cities.filter((city) =>
        city.categories.some(({ id }) => id === category.id),
      );
      return citiesInCategory.length > 0
        ? [{ category, cities: citiesInCategory }]
        : [];
    });
  }
  async toggleFavorite(params: CityToggleFavoriteParams): Promise<void> {
    const city = cities.find((city) => city.id === params.cityId);
    // params.isFavorite is the state before the toggle
    if (city) {
      city.isFavorite = !params.isFavorite;
    }
  }
  async findAllFavorites(): Promise<CityPreview[]> {
    return cities.filter((city) => city.isFavorite);
  }
  async findById(id: string): Promise<City> {
    const city = cities.find((city) => city.id === id);
    if (city) {
      return city;
    }
    throw new Error("City not found");
  }
  async getRelatedCities(cityId: string): Promise<CityPreview[]> {
    const city = cities.find((city) => city.id === cityId);
    return cities.filter((c) => city?.relatedCitiesIds.includes(c.id));
  }

  async findAll({
    name,
    categoryId,
  }: CityFindAllFilters): Promise<CityPreview[]> {
    let cityPreviewList = [...cities];

    if (name) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (categoryId) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.categories.some((category) => category.id === categoryId);
      });
    }

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("");
    //   }, 2000);
    // });

    // throw new Error("server is down!");

    return cityPreviewList;
  }
}
