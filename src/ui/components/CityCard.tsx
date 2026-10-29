import { Pressable, useWindowDimensions, View } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";

import { CityPreview } from "@/src/domain/city/City";
import { Text } from "../primitives/Text";
import { BlackOpacity } from "./BlackOpacity";
import { CityFavoriteButton } from "./CityFavoriteButton";

type CityCardProps = {
  cityPreview: CityPreview;
  type?: "small" | "large";
  disableFavorite?: boolean;
  className?: string;
};

export function CityCard({
  cityPreview,
  type = "large",
  disableFavorite = false,
  className,
}: CityCardProps) {
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === "small" ? { width: cardWith, height: cardHeight } : undefined;

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable testID={`city-card-${cityPreview.id}`} className={className}>
        <View
          className="h-[280px] w-full overflow-hidden rounded-2xl"
          style={style}
        >
          <Image
            source={cityPreview.coverImage}
            className="absolute inset-0"
            transition={300}
          />
          <BlackOpacity />
          <View className="flex-1 justify-between p-6">
            <View className="self-end">
              {!disableFavorite && (
                <CityFavoriteButton city={cityPreview} onImage />
              )}
            </View>

            <View>
              <Text variant="title" className="text-white">
                {cityPreview.name}
              </Text>
              <Text className="text-white">{cityPreview.country}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
