export interface IStorage {
  setItem: <IData>(key: string, value: IData) => Promise<void>;
  getItem: <IData>(key: string) => Promise<IData | null>;
  removeItem: (key: string) => Promise<void>;
}
