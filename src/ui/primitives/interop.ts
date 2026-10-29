import { Image } from "expo-image";
import { cssInterop } from "nativewind";

// Third-party components need registering before className styles them; the
// root layout imports this once. Icon registers its font component where it's made.
// Reanimated views are left out: registering them drops their animated styles,
// so animated views keep plain styles and wrap a className child instead.
cssInterop(Image, { className: "style" });
