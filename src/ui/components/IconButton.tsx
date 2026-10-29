import { Pressable, PressableProps } from "react-native";
import { cn } from "../primitives/cn";
import { Icon, IconName } from "./Icon";

type IconButtonProps = {
  iconName: IconName;
  onPress: PressableProps["onPress"];
  accessibilityLabel: string;
  testID?: PressableProps["testID"];
  className?: string;
};
export function IconButton({
  iconName,
  onPress,
  accessibilityLabel,
  testID,
  className,
}: IconButtonProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className={cn(
        "size-[50px] items-center justify-center rounded-full bg-primary shadow-primary active:opacity-80",
        className,
      )}
    >
      <Icon name={iconName} className="text-primary-foreground" />
    </Pressable>
  );
}
