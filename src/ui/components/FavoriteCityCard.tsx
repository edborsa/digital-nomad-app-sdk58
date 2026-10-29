import { Image, Pressable, useWindowDimensions, View } from "react-native";

import { Link } from "expo-router";

import { CityPreview } from "@/src/domain/city/City";
import { cn } from "../primitives/cn";
import { Text } from "../primitives/Text";
import { CityFavoriteButton } from "./CityFavoriteButton";

type FavoriteCityCardProps = {
  cityPreview: CityPreview;
  className?: string;
};

export function FavoriteCityCard({
  cityPreview,
  className,
}: FavoriteCityCardProps) {
  const { width } = useWindowDimensions();
  const IMAGE_WIDTH = width * 0.3;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable
        testID={`favorite-city-card-${cityPreview.id}`}
        className={cn(
          "flex-row justify-between rounded-2xl bg-surface p-3",
          className,
        )}
      >
        <View className="flex-row">
          <Image
            source={
              typeof cityPreview.coverImage === "number"
                ? cityPreview.coverImage
                : { uri: cityPreview.coverImage }
            }
            className="rounded-2xl"
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
          />

          <View className="ml-4 justify-center">
            <Text variant="heading">{cityPreview.name}</Text>
            <Text>{cityPreview.country}</Text>
          </View>
        </View>

        <View className="self-start">
          <CityFavoriteButton city={cityPreview} />
        </View>
      </Pressable>
    </Link>
  );
}
