import { LinkProps, router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "../primitives/Text";

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
    <Pressable
      testID={testID}
      accessibilityRole="link"
      className="mt-4 min-h-11 justify-center self-center"
      onPress={handleOnPress}
    >
      <Text className="text-muted">
        {text}{" "}
        <Text variant="label" className="text-primary">
          {ctaText}
        </Text>
      </Text>
    </Pressable>
  );
}
