import { Image, useColorScheme } from "react-native";

export function Logo() {
  const colorScheme = useColorScheme();

  return (
    <Image
      source={
        colorScheme === "dark"
          ? require("../../../assets/images/logo.png")
          : require("../../../assets/images/logo-on-light.png")
      }
      className="mt-5 mb-[60px] h-[60px] w-[150px] self-center"
    />
  );
}
