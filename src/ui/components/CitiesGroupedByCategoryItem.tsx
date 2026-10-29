import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";
import { ScrollView, View } from "react-native";
import { Text } from "../primitives/Text";
import { categoryIconMap } from "./CategoryPill";
import { CityCard } from "./CityCard";
import { Icon } from "./Icon";

export function CitiesGroupedByCategoryItem({
  category,
  cities,
}: CitiesGroupedByCategory) {
  return (
    <View>
      <View className="ml-4 flex-row">
        <Icon name={categoryIconMap[category.code]} className="text-primary" />
        <View className="mb-4 ml-3">
          <Text variant="title">{category.name}</Text>
          <Text variant="body-sm">{category.description}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-4 pl-4"
      >
        {cities.map((city) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            type="small"
            disableFavorite
          />
        ))}
      </ScrollView>
    </View>
  );
}
