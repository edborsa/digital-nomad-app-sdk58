import createIconSetFromIcoMoon from "@expo/vector-icons/createIconSetFromIcoMoon";
import { styled } from "nativewind";
import { cn } from "../primitives/cn";

// Text colour classes (text-primary, text-muted) set the icon colour
const IconFromIcoMoon = styled(
  createIconSetFromIcoMoon(
    require("../../../assets/icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf",
  ),
  { className: { target: "style", nativeStyleMapping: { color: true } } },
);

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};
export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <IconFromIcoMoon
      name={name}
      size={size}
      className={cn("text-muted", className)}
    />
  );
}

export type IconName =
  | "Adventure"
  | "Beach"
  | "Chevron-down"
  | "Chevron-left"
  | "Chevron-right"
  | "Chevron-up"
  | "Close"
  | "Culture"
  | "Explore"
  | "Favorite-fill"
  | "Favorite-outline"
  | "Gastronomy"
  | "Group"
  | "History"
  | "Home-fill"
  | "Home-outline"
  | "Luxury"
  | "Nature"
  | "Search-outline"
  | "Shopping"
  | "Star"
  | "Urban"
  | "Person-fill"
  | "Person-outline"
  | "Logout";
