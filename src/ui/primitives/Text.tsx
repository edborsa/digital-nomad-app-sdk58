import { cva, VariantProps } from "class-variance-authority";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "./cn";

const text = cva("text-foreground", {
  variants: {
    variant: {
      display: "font-poppins-semibold text-display",
      title: "font-poppins-semibold text-title",
      heading: "font-poppins-semibold text-heading",
      label: "font-poppins-semibold text-label",
      "body-lg": "font-poppins text-body-lg",
      body: "font-poppins text-body",
      "body-sm": "font-poppins text-body-sm",
      caption: "font-poppins text-caption",
    },
  },
  defaultVariants: { variant: "body" },
});

export type TextProps = RNTextProps & VariantProps<typeof text>;

export function Text({ variant, className, ...textProps }: TextProps) {
  return <RNText className={cn(text({ variant }), className)} {...textProps} />;
}
