import { useColorScheme } from "nativewind";
import { Image } from "react-native";

export function Logo() {
  const { colorScheme } = useColorScheme();

  return (
    <Image
      source={
        colorScheme === "dark"
          ? require("../../../assets/images/logo.png")
          : require("../../../assets/images/logo-on-light.png")
      }
      className="mb-[60px] mt-5 h-[60px] w-[150px] self-center"
    />
  );
}
