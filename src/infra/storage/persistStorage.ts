import { PersistStorage, StorageValue } from "zustand/middleware";
import { IStorage } from "./IStorage";

// Lets a Zustand store persist through any storage adapter, which handles serialisation itself
export function persistStorage<S>(storage: IStorage): PersistStorage<S> {
  return {
    getItem: (name) => storage.getItem<StorageValue<S>>(name),
    setItem: (name, value) => storage.setItem(name, value),
    removeItem: (name) => storage.removeItem(name),
  };
}
