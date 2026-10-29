import { useCityFindById } from "@/src/domain/city/operations/useCityFindById";
import { Divider } from "@/src/ui/components/Divider";
import { Screen } from "@/src/ui/components/Screen";
import { BottomSheetMap } from "@/src/ui/containers/BottomSheetMap";
import { CityDetailsHeader } from "@/src/ui/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/ui/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/ui/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/ui/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttractions } from "@/src/ui/containers/CityDetailsTouristAttractions";
import { Text } from "@/src/ui/primitives/Text";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, useSharedValue } from "react-native-reanimated";

const PAGE_ANIMATION_TIME = 1000;

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: city, error, isLoading } = useCityFindById(id);

  const bottomSheetIsOpen = useSharedValue(false);
  function toggleBottomSheet() {
    bottomSheetIsOpen.set(!bottomSheetIsOpen.get());
  }

  if (isLoading) {
    return (
      <Screen className="items-center justify-center">
        <Text>Carregando dados...</Text>
      </Screen>
    );
  }

  if (error || !city) {
    return (
      <Screen className="items-center justify-center">
        <Text>Erro ao carregar cidade</Text>
      </Screen>
    );
  }

  return (
    <>
      <Screen className="px-0" scrollable>
        <Animated.View entering={FadeIn.duration(PAGE_ANIMATION_TIME)}>
          <CityDetailsHeader
            id={city.id}
            coverImage={city.coverImage}
            categories={city.categories}
            isFavorite={city.isFavorite}
          />
          <CityDetailsInfo
            name={city.name}
            country={city.country}
            description={city.description}
          />
          <Divider className="px-4" />
          <CityDetailsTouristAttractions
            touristAttractions={city.touristAttractions}
          />

          <Divider className="px-4" />
          <Pressable testID="city-details-map" onPress={toggleBottomSheet}>
            <CityDetailsMap location={city.location} />
          </Pressable>

          <Divider className="px-4" />
          <CityDetailsRelatedCities id={city.id} />
        </Animated.View>
      </Screen>
      {/* Covers the screen so the sheet's backdrop can dim it; touches pass through to the page */}
      <Animated.View
        entering={FadeIn.duration(0).delay(PAGE_ANIMATION_TIME)}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
      >
        <BottomSheetMap
          location={city.location}
          isOpen={bottomSheetIsOpen}
          onPress={toggleBottomSheet}
        />
      </Animated.View>
    </>
  );
}
