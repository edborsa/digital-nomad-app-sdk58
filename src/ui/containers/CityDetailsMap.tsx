import { City } from "@/src/domain/city/City";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { Text } from "../primitives/Text";

type CityDetailsMapProps = Pick<City, "location">;

export function CityDetailsMap({ location }: CityDetailsMapProps) {
  return (
    <View className="p-4">
      <Text variant="title" className="mb-4">
        Mapa
      </Text>
      <View className="h-[200px] w-full overflow-hidden rounded-2xl">
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
}
