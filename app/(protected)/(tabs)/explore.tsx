import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";
import { useCityFindGroupedByCategory } from "@/src/domain/city/operations/useCityFindGroupedByCategory";
import { CitiesGroupedByCategoryItem } from "@/src/ui/components/CitiesGroupedByCategoryItem";
import { Screen } from "@/src/ui/components/Screen";
import { Separator } from "@/src/ui/components/Separator";
import { useScrollToTop } from "expo-router";
import { useRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { data } = useCityFindGroupedByCategory();
  const { top } = useSafeAreaInsets();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CitiesGroupedByCategory>) {
    return <CitiesGroupedByCategoryItem {...item} />;
  }

  return (
    <Screen className="px-0">
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.category.id}
        ItemSeparatorComponent={Separator}
        contentContainerClassName="pb-4"
        contentContainerStyle={{ paddingTop: top }}
      />
    </Screen>
  );
}
