import { City } from "@/src/domain/city/City";
import { View } from "react-native";
import { Accordion } from "../components/Accordion";
import { Text } from "../primitives/Text";

type Props = Pick<City, "touristAttractions">;
export function CityDetailsTouristAttractions({ touristAttractions }: Props) {
  return (
    <View className="p-4">
      <Text variant="title" className="mb-2">
        Pontos turísticos
      </Text>
      <View className="gap-2">
        {touristAttractions.map((attraction) => (
          <Accordion
            key={attraction.id}
            title={attraction.name}
            description={attraction.description}
          />
        ))}
      </View>
    </View>
  );
}
