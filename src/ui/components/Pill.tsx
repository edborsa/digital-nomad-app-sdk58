import { Pressable, PressableProps } from "react-native";
import { cn } from "../primitives/cn";
import { Text } from "../primitives/Text";
import { Icon, IconName } from "./Icon";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps["onPress"];
  testID?: PressableProps["testID"];
  className?: string;
};

/**
 * The height of the pill is the sum of the icon size, padding, and border width.
 * This is used to calculate the marginTop of the pill to center it vertically.
 */
export const PILL_HEIGHT = 16 + 16 + 4;

export function Pill({
  label,
  iconName,
  active,
  onPress,
  testID,
  className,
}: PillProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      // Reaches the 44 pt target without changing PILL_HEIGHT
      hitSlop={4}
      onPress={onPress}
      className={cn(
        "flex-row items-center rounded-full border-2 border-border px-3 py-2",
        active ? "bg-surface" : "bg-transparent",
        className,
      )}
    >
      <Icon
        name={iconName}
        size={16}
        className={active ? "text-primary" : "text-muted"}
      />
      <Text variant="caption" className="ml-1">
        {label}
      </Text>
    </Pressable>
  );
}
