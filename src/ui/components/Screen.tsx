import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { cn } from "../primitives/cn";

export function Screen({
  children,
  scrollable = false,
  className,
}: PropsWithChildren & { scrollable?: boolean; className?: string }) {
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className={cn("flex-1 bg-background px-4", className)}>
        <Container showsVerticalScrollIndicator={false}>{children}</Container>
      </View>
    </KeyboardAvoidingView>
  );
}
