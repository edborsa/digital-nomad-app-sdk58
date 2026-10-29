import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { City } from "@/src/domain/city/City";
import { BlackOpacity } from "../components/BlackOpacity";
import { CategoryPill } from "../components/CategoryPill";
import { CityFavoriteButton } from "../components/CityFavoriteButton";
import { IconButton } from "../components/IconButton";
import { PILL_HEIGHT } from "../components/Pill";

type CityDetailsHeaderProps = Pick<
  City,
  "id" | "coverImage" | "categories" | "isFavorite"
>;

export function CityDetailsHeader({
  id,
  coverImage,
  categories,
  isFavorite,
}: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();
  return (
    <View>
      <View className="h-[250px] w-full overflow-hidden rounded-br-[40px]">
        <Image
          source={coverImage}
          className="absolute inset-0"
          transition={300}
        />
        <BlackOpacity />
        <View
          className="flex-row items-center justify-between px-4"
          style={{ paddingTop: top }}
        >
          <IconButton
            testID="back-button"
            iconName="Chevron-left"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
          />
          <CityFavoriteButton size={30} city={{ id, isFavorite }} onImage />
        </View>
      </View>

      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <View className="flex-row gap-2 px-4">
          {categories.map((category) => (
            <CategoryPill active={true} key={category.id} category={category} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
