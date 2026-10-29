import SQLiteKvStore from "expo-sqlite/kv-store";
import { IStorage } from "../IStorage";

// Device storage for non-sensitive data, usable outside React (e.g. by stores)
export const kvStorage: IStorage = {
  getItem: async (key) => {
    const item = await SQLiteKvStore.getItem(key);
    return item === null ? null : JSON.parse(item);
  },
  setItem: async (key, value) => {
    await SQLiteKvStore.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await SQLiteKvStore.removeItem(key);
  },
};
