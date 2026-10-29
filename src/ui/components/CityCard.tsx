import { Pressable, StyleSheet, useWindowDimensions } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAppTheme } from "../theme/useAppTheme";

import { CityPreview } from "@/src/domain/city/City";
import { BlackOpacity } from "./BlackOpacity";
import { Box } from "./Box";
import { CityFavoriteButton } from "./CityFavoriteButton";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  type?: "small" | "large";
  disableFavorite?: boolean;
};

export function CityCard({
  cityPreview,
  type = "large",
  disableFavorite = false,
}: CityCardProps) {
  const { borderRadii } = useAppTheme();

  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === "small" ? { width: cardWith, height: cardHeight } : undefined;

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable testID={`city-card-${cityPreview.id}`}>
        <Box width="100%" height={280} style={style}>
          <Image
            source={cityPreview.coverImage}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: borderRadii.default },
            ]}
            transition={300}
          />
          <BlackOpacity />
          <Box flex={1} padding="s24" justifyContent="space-between">
            {
              <Box alignSelf="flex-end">
                {!disableFavorite && <CityFavoriteButton city={cityPreview} />}
              </Box>
            }

            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </Box>
      </Pressable>
    </Link>
  );
}
