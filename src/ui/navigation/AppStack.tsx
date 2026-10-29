import { useSessionStore } from "@/src/domain/auth/useSessionStore";
import { usePreferencesHydrated } from "@/src/domain/preferences/usePreferencesStore";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useApplyThemeMode } from "../theme/useApplyThemeMode";

SplashScreen.preventAutoHideAsync();

export function AppStack() {
  useApplyThemeMode();
  useHideSplashWhenReady();
  const sessionStatus = useSessionStore((state) => state.status);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Protected guard={sessionStatus === "signedIn"}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
      {/* Also open while restoring, so some screen is always reachable; the splash covers it */}
      <Stack.Protected guard={sessionStatus !== "signedIn"}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="reset-password" />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

// The splash stays up until the Session is restored and preferences have loaded, so
// the first screen is the right one, in the right theme
function useHideSplashWhenReady() {
  const sessionRestored = useSessionStore(
    (state) => state.status !== "restoring",
  );
  const preferencesHydrated = usePreferencesHydrated();
  const ready = sessionRestored && preferencesHydrated;

  useEffect(() => {
    if (ready) {
      SplashScreen.hide();
    }
  }, [ready]);
}
