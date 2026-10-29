import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { City } from "@/src/domain/city/City";
import { BlackOpacity } from "../components/BlackOpacity";
import { Box } from "../components/Box";
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
    <Box>
      <Box width="100%" height={250}>
        <Image
          source={coverImage}
          style={[StyleSheet.absoluteFill, { borderBottomRightRadius: 40 }]}
          transition={300}
        />
        <BlackOpacity />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="padding"
          style={{ paddingTop: top }}
        >
          <IconButton
            testID="back-button"
            iconName="Chevron-left"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
          />
          <CityFavoriteButton size={30} city={{ id, isFavorite }} onImage />
        </Box>
      </Box>

      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <Box flexDirection="row" gap="s8" paddingHorizontal="padding">
          {categories.map((category) => (
            <CategoryPill active={true} key={category.id} category={category} />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
