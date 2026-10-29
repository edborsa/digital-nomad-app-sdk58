jest.mock("@expo/vector-icons/createIconSetFromIcoMoon", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  function FakeIcon(props: any) {
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
