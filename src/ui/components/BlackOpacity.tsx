import { View } from "react-native";

// Darkens a photo behind white text, so it stays black in both themes
export function BlackOpacity() {
  return <View className="absolute inset-0 bg-black/25" />;
}
