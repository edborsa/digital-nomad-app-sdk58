import { screen } from "@testing-library/react-native";
import { colorScheme } from "nativewind";
import { usePreferencesStore } from "../domain/preferences/usePreferencesStore";
import { inMemoryStorage } from "../infra/storage/adapters/InMemoryStorage";

const { storeResetFns } = jest.requireMock<{
  storeResetFns: Set<() => void>;
}>("zustand");

/**
 * Simulates quitting and reopening the app: what is stored on the device
 * survives, everything held in memory starts over.
 */
export async function restartApp() {
  screen.unmount();

  // Resetting a persisted store writes its defaults back to storage, so keep the device's copy aside
  const deviceStorage = inMemoryStorage.snapshot();
  storeResetFns.forEach((resetFn) => resetFn());
  inMemoryStorage.restore(deviceStorage);
  colorScheme.set("system");

  // Like a cold start, the next render begins while stored preferences are still loading
  void usePreferencesStore.persist.rehydrate();
}
