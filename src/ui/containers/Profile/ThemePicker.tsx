import {
  ThemeMode,
  usePreferencesStore,
} from "@/src/domain/preferences/usePreferencesStore";
import { Pressable, View } from "react-native";
import { cn } from "../../primitives/cn";
import { Text } from "../../primitives/Text";

const options: { mode: ThemeMode; label: string }[] = [
  { mode: "light", label: "Claro" },
  { mode: "dark", label: "Escuro" },
  { mode: "system", label: "Sistema" },
];

export function ThemePicker() {
  const themeMode = usePreferencesStore((state) => state.themeMode);
  const setThemeMode = usePreferencesStore((state) => state.setThemeMode);

  return (
    <View className="mt-6">
      <Text variant="heading" className="mb-4">
        Tema
      </Text>
      <View className="flex-row gap-x-2 rounded-2xl bg-surface p-1">
        {options.map(({ mode, label }) => {
          const selected = mode === themeMode;
          return (
            <Pressable
              key={mode}
              testID={`theme-option-${mode}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setThemeMode(mode)}
              className={cn(
                "min-h-11 flex-1 items-center justify-center rounded-xl",
                selected && "bg-primary",
              )}
            >
              <Text
                variant="label"
                className={cn(selected && "text-primary-foreground")}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
