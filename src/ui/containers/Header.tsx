import { router } from "expo-router";
import { View } from "react-native";
import { IconButton } from "../components/IconButton";
import { Text } from "../primitives/Text";

type HeaderProps = {
  title: string;
};
export function Header({ title }: HeaderProps) {
  return (
    <View className="mb-14 flex-row items-center justify-between">
      <IconButton
        iconName="Chevron-left"
        accessibilityLabel="Voltar"
        onPress={() => router.back()}
      />
      <Text variant="heading">{title}</Text>
    </View>
  );
}
