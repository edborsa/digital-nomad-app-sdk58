import { usePreferencesStore } from "@/src/domain/preferences/usePreferencesStore";
import { Appearance } from "react-native";
import { useEffect } from "react";

// Keeps the device appearance, which picks the light or dark styles, on the chosen
// theme mode from start-up onwards
export function useApplyThemeMode() {
  const themeMode = usePreferencesStore((state) => state.themeMode);

  useEffect(() => {
    // "unspecified" hands the appearance back to the device setting
    Appearance.setColorScheme(
      themeMode === "system" ? "unspecified" : themeMode,
    );
  }, [themeMode]);
}
