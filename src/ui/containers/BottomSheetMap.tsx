import { StyleSheet, useWindowDimensions, View } from "react-native";
import MapView from "react-native-maps";

import { City } from "@/src/domain/city/City";
import { BottomSheet, BottomSheetProps } from "../components/BottomSheet";
import { IconButton } from "../components/IconButton";

type BottomSheetMapProps = Omit<BottomSheetProps, "children"> & {
  location: City["location"];
};
export function BottomSheetMap({
  location,
  ...bottomSheetProps
}: BottomSheetMapProps) {
  const { height } = useWindowDimensions();
  return (
    <BottomSheet {...bottomSheetProps}>
      <View
        className="w-full overflow-hidden rounded-2xl"
        style={{ height: height * 0.7 }}
      >
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.2,
          }}
        />
      </View>
      <IconButton
        iconName="Close"
        accessibilityLabel="Fechar mapa"
        className="absolute right-4 top-4"
        onPress={bottomSheetProps.onPress}
      />
    </BottomSheet>
  );
}
