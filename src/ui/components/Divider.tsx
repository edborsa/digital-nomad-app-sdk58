import { View } from "react-native";
import { cn } from "../primitives/cn";

export function Divider({ className }: { className?: string }) {
  return (
    <View className={cn("my-6", className)}>
      <View className="h-px w-full self-center bg-border" />
    </View>
  );
}
