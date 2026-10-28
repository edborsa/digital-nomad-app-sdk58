jest.mock("@expo/vector-icons/createIconSetFromIcoMoon", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  function FakeIcon(props: any) {
    return <View testID={props.name} />;
  }

  return () => FakeIcon;
});

// Worklets 0.7 needs its native module at import time, so Jest uses its mock
jest.mock("react-native-worklets", () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("react-native-worklets/src/mock"),
);

// react-native-maps 1.27 needs its native module at import time
jest.mock("react-native-maps", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  return View;
});
