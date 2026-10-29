import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";

// expo-image with className; NativeWind only styles React Native's own components by itself
export const Image = styled(ExpoImage, { className: "style" });
