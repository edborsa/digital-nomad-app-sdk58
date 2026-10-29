import { usePreferencesStore } from "@/src/domain/preferences/usePreferencesStore";
import { colorScheme } from "nativewind";
import { useEffect } from "react";

// Keeps NativeWind's colour scheme on the chosen theme mode, from start-up onwards
export function useApplyThemeMode() {
  const themeMode = usePreferencesStore((state) => state.themeMode);

  useEffect(() => {
    colorScheme.set(themeMode);
  }, [themeMode]);
}
