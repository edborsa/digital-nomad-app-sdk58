import { kvStorage } from "@/src/infra/storage/adapters/KvStorage";
import { persistStorage } from "@/src/infra/storage/persistStorage";
import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type PreferencesState = {
  themeMode: ThemeMode;
  hasSeenOnboarding: boolean;
  setThemeMode: (themeMode: ThemeMode) => void;
  markOnboardingSeen: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      themeMode: "system",
      hasSeenOnboarding: false,
      setThemeMode: (themeMode) => set({ themeMode }),
      markOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: "preferences",
      storage: persistStorage(kvStorage),
      partialize: ({ themeMode, hasSeenOnboarding }) => ({
        themeMode,
        hasSeenOnboarding,
      }),
    },
  ),
);

// Preferences load from device storage asynchronously; false until they have
export function usePreferencesHydrated() {
  return useSyncExternalStore(
    (onChange) => usePreferencesStore.persist.onFinishHydration(onChange),
    () => usePreferencesStore.persist.hasHydrated(),
  );
}
