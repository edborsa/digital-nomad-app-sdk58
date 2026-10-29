import { IStorage } from "../IStorage";

class InMemoryStorage implements IStorage {
  private store = new Map<string, unknown>();

  async setItem<IData>(key: string, value: IData): Promise<void> {
    this.store.set(key, value);
  }

  async getItem<IData>(key: string): Promise<IData | null> {
    if (!this.store.has(key)) {
      return null;
    }
    return this.store.get(key) as IData;
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  // Helpers for testing
  clear(): void {
    this.store.clear();
  }

  snapshot(): Map<string, unknown> {
    return new Map(this.store);
  }

  restore(snapshot: Map<string, unknown>): void {
    this.store = new Map(snapshot);
  }
}
//using a singleton so will can call clear when testing
export const inMemoryStorage = new InMemoryStorage();
