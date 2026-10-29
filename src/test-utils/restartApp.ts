import { act, screen } from "@testing-library/react-native";
import { colorScheme } from "nativewind";
import * as zustand from "zustand";
import { useSessionStore } from "../domain/auth/useSessionStore";
import { usePreferencesStore } from "../domain/preferences/usePreferencesStore";
import { inMemoryStorage } from "../infra/storage/adapters/InMemoryStorage";

// The Jest mock of zustand (__mocks__/zustand.ts) records how to reset every store.
// Imported rather than taken from jest.requireMock(), which returns a separate copy.
const { storeResetFns } = zustand as unknown as {
  storeResetFns: Set<() => void>;
};

/**
 * Simulates quitting and reopening the app: what is stored on the device
 * survives, everything held in memory starts over. By default it waits until
 * the stored Session and preferences have loaded; with `holdRestore`, they stay
 * loading (the Session "restoring") until the returned function is awaited.
 */
export async function restartApp(options?: { holdRestore?: boolean }) {
  await screen.unmount();

  // Resetting a persisted store writes its defaults back to storage, so keep the device's copy aside
  const deviceStorage = inMemoryStorage.snapshot();
  storeResetFns.forEach((resetFn) => resetFn());
  inMemoryStorage.restore(deviceStorage);
  colorScheme.set("system");

  // Inside act(), so no routing work is left queued on the fake timers the next render resets
  const finishRestoring = () =>
    act(async () => {
      await useSessionStore.persist.rehydrate();
      await usePreferencesStore.persist.rehydrate();
    });

  if (options?.holdRestore) {
    return finishRestoring;
  }
  await finishRestoring();
}
