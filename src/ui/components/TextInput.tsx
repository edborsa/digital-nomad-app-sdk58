import { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import { cn } from "../primitives/cn";
import { Text } from "../primitives/Text";

type TextInputProps = RNTextInputProps & {
  label: string;
  errorMessage?: string;
};
export function TextInput({
  label,
  errorMessage,
  testID,
  className,
  ...textInputProps
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = errorMessage
    ? "border-error"
    : isFocused
      ? "border-foreground"
      : "border-border";

  return (
    <View>
      <Text variant="label" className="mb-1">
        {label}
      </Text>
      <View
        testID={`${testID}-container`}
        className={cn(
          "h-[50px] flex-row items-center rounded-2xl border-2 px-4",
          borderColor,
        )}
      >
        <RNTextInput
          testID={testID}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
          className={cn(
            "h-full w-full shrink font-poppins-semibold text-heading text-foreground placeholder:text-muted",
            className,
          )}
        />
      </View>
      <Text variant="caption" className="my-1 text-error">
        {errorMessage}
      </Text>
    </View>
  );
}
