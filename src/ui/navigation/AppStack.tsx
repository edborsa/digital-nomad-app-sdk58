import { useAuth } from "@/src/domain/auth/AuthContext";
import { usePreferencesHydrated } from "@/src/domain/preferences/usePreferencesStore";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useApplyThemeMode } from "../theme/useApplyThemeMode";

SplashScreen.preventAutoHideAsync();

export function AppStack() {
  useApplyThemeMode();
  useHideSplashWhenReady();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}

// The splash stays up until the stored user and preferences have loaded, so the
// first screen is the right one, in the right theme
function useHideSplashWhenReady() {
  const { isReady: authReady } = useAuth();
  const preferencesHydrated = usePreferencesHydrated();
  const ready = authReady && preferencesHydrated;

  useEffect(() => {
    if (ready) {
      SplashScreen.hide();
    }
  }, [ready]);
}
