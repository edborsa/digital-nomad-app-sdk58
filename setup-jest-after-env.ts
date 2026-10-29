import { colorScheme } from "nativewind";
import { inMemoryStorage } from "./src/infra/storage/adapters/InMemoryStorage";

// Every test starts like a fresh install: nothing stored, following the system theme
beforeEach(() => {
  inMemoryStorage.clear();
  colorScheme.set("system");
});
