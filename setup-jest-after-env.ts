import { colorScheme } from "nativewind";
import { useSessionStore } from "./src/domain/auth/useSessionStore";
import { inMemoryStorage } from "./src/infra/storage/adapters/InMemoryStorage";

// Every test starts like a fresh install: nothing stored, signed out, following the system theme
beforeEach(async () => {
  inMemoryStorage.clear();
  colorScheme.set("system");
  await useSessionStore.persist.rehydrate();
});
