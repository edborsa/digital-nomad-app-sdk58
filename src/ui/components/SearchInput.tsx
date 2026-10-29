import { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { cn } from "../primitives/cn";
import { IconButton } from "./IconButton";

type SearchInputProps = { className?: string } & Pick<
  TextInputProps,
  "value" | "onChangeText" | "placeholder"
>;
export function SearchInput({
  value,
  onChangeText,
  placeholder,
  className,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function onPressIconButton() {
    if (value!.length > 0) {
      onChangeText?.("");
    }
  }

  return (
    <View
      className={cn(
        "h-[70px] flex-row items-center justify-between rounded-full border-2 bg-surface p-2 pl-4",
        isFocused ? "border-primary" : "border-surface",
        className,
      )}
    >
      <TextInput
        testID="search-input"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-full w-full shrink font-poppins-semibold text-heading text-foreground placeholder:text-foreground"
      />
      <IconButton
        iconName={value!.length > 0 ? "Close" : "Search-outline"}
        accessibilityLabel={value!.length > 0 ? "Limpar busca" : "Buscar"}
        onPress={onPressIconButton}
      />
    </View>
  );
}
