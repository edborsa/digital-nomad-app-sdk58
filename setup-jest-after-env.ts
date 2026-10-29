import { Appearance } from "react-native";
import { useSessionStore } from "./src/domain/auth/useSessionStore";
import { inMemoryStorage } from "./src/infra/storage/adapters/InMemoryStorage";

// Every test starts like a fresh install: nothing stored, signed out, following the system theme
beforeEach(async () => {
  inMemoryStorage.clear();
  Appearance.setColorScheme("unspecified");
  await useSessionStore.persist.rehydrate();
});
