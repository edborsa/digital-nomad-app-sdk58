jest.mock("@expo/vector-icons/createIconSetFromIcoMoon", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  function FakeIcon(props: { name: string }) {
    return <View testID={props.name} />;
  }

  return () => FakeIcon;
});

// react-native-maps needs its native module at import time
jest.mock("react-native-maps", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  return View;
});

// The device's storage modules are native; tests keep everything in memory instead.
// Jest never runs these two adapters, so they're left out of coverage; Maestro covers them.
jest.mock("./src/infra/storage/adapters/KvStorage", () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  kvStorage: require("./src/infra/storage/adapters/InMemoryStorage")
    .inMemoryStorage,
}));
jest.mock("./src/infra/storage/adapters/SecureStorage", () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  secureStorage: require("./src/infra/storage/adapters/InMemoryStorage")
    .inMemoryStorage,
}));
