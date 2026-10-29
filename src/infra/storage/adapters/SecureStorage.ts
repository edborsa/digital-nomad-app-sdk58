import * as SecureStore from "expo-secure-store";
import { IStorage } from "../IStorage";

// Encrypted device storage (Keychain / Keystore) for credentials, usable outside React.
// Keys may only contain letters, digits, ".", "-" and "_"; values should stay under 2 KB.
export const secureStorage: IStorage = {
  getItem: async (key) => {
    const item = await SecureStore.getItemAsync(key);
    return item === null ? null : JSON.parse(item);
  },
  setItem: async (key, value) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(key);
  },
};
