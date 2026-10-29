import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { City } from "../../domain/city/City";
import { useGetRelatedCities } from "../../domain/city/operations/useGetRelatedCities";
import { CityCard } from "../components/CityCard";
import { Text } from "../primitives/Text";

type Props = Pick<City, "id">;
export function CityDetailsRelatedCities({ id }: Props) {
  const { data: cities } = useGetRelatedCities(id);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: bottom }}>
      <Text variant="title" className="mb-4 px-4">
        Veja Também
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-4"
      >
        {cities?.map((city) => (
          <CityCard key={city.id} cityPreview={city} type="small" />
        ))}
      </ScrollView>
    </View>
  );
}
