import { LinkProps, router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "../components/Text";

export type TextLinkProps = {
  text: string;
  ctaText: string;
  href?: LinkProps["href"];
  goBackOnPress?: boolean;
  testID?: string;
};
export function TextLink({
  text,
  ctaText,
  href,
  goBackOnPress,
  testID,
}: TextLinkProps) {
  function handleOnPress() {
    if (href) {
      router.navigate(href);
    } else if (goBackOnPress) {
      router.back();
    }
  }

  return (
    <Pressable testID={testID} onPress={handleOnPress}>
      <Text alignSelf="center" mt="s16" color="gray2">
        {text}{" "}
        <Text variant="title14" color="primary">
          {ctaText}
        </Text>
      </Text>
    </Pressable>
  );
}
