import { City } from "@/src/domain/city/City";
import { useCityToggleFavorite } from "@/src/domain/city/operations/useCityToggleFavorite";
import { Pressable } from "react-native";
import { Icon } from "./Icon";

export function CityFavoriteButton({
  city,
  size,
  onImage = false,
}: {
  city: Pick<City, "id" | "isFavorite">;
  size?: number;
  // Over a photo the outline stays white in both themes
  onImage?: boolean;
}) {
  const { mutate: toggleFavorite, isFavorite } = useCityToggleFavorite(city);

  return (
    <Pressable
      testID={`favorite-button-${city.id}`}
      accessibilityRole="button"
      accessibilityLabel="Favorito"
      accessibilityState={{ selected: isFavorite }}
      hitSlop={10}
      className="active:opacity-60"
      onPress={() => {
        toggleFavorite({ cityId: city.id, isFavorite: false });
      }}
    >
      <Icon
        size={size}
        name={isFavorite ? "Favorite-fill" : "Favorite-outline"}
        className={
          isFavorite
            ? "text-primary"
            : onImage
              ? "text-white"
              : "text-foreground"
        }
      />
    </Pressable>
  );
}
