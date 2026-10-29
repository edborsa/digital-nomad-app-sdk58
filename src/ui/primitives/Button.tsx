import { cva, VariantProps } from "class-variance-authority";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import { cn } from "./cn";
import { Text } from "./Text";

const button = cva(
  "min-h-11 flex-row items-center justify-center gap-2 rounded-2xl px-4 py-3 active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-surface",
        ghost: "bg-transparent",
      },
      disabled: { true: "opacity-50" },
    },
    defaultVariants: { variant: "primary" },
  },
);

const label = cva("", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      secondary: "text-foreground",
      ghost: "text-primary",
    },
  },
  defaultVariants: { variant: "primary" },
});

type ButtonProps = Omit<PressableProps, "children" | "disabled"> &
  Omit<VariantProps<typeof button>, "disabled"> & {
    title: string;
    disabled?: boolean;
    loading?: boolean;
  };

export function Button({
  title,
  variant,
  disabled = false,
  loading = false,
  className,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(button({ variant, disabled: isDisabled }), className)}
      {...pressableProps}
    >
      {loading && <ActivityIndicator className={label({ variant })} />}
      <Text variant="heading" className={label({ variant })}>
        {title}
      </Text>
    </Pressable>
  );
}
