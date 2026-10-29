import { City } from "@/src/domain/city/City";
import { View } from "react-native";
import { Text } from "../primitives/Text";

type CityDetailsInfoProps = Pick<City, "name" | "country" | "description">;

export function CityDetailsInfo({
  name,
  country,
  description,
}: CityDetailsInfoProps) {
  return (
    <View className="p-4">
      <Text testID="city-details-name" variant="display" className="mb-0.5">
        {name}
      </Text>
      <Text variant="body-lg" className="mb-6">
        {country}
      </Text>
      <Text variant="body-sm">{description}</Text>
    </View>
  );
}
