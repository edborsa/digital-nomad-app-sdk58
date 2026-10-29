import { ScrollView, View } from "react-native";

import { Category } from "@/src/domain/category/Category";
import { CategoryPill } from "../components/CategoryPill";
import { SearchInput } from "../components/SearchInput";

type CityFilterProps = {
  categories?: Category[];
  cityName: string;
  onChangeCityName: (cityName: string) => void;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (id: string | null) => void;
};
export function CityFilter({
  categories,
  cityName,
  onChangeCityName,
  selectedCategoryId,
  onChangeSelectedCategoryId,
}: CityFilterProps) {
  return (
    <View>
      <View className="px-4">
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder="Qual seu próximo destino?"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="mt-4 flex-row gap-2 px-4">
          {categories?.map((category) => (
            <CategoryPill
              key={category.id}
              active={category.id === selectedCategoryId}
              category={category}
              onPress={() =>
                onChangeSelectedCategoryId(
                  category.id === selectedCategoryId ? null : category.id,
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
