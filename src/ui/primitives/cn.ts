import { ClassNameValue, extendTailwindMerge } from "tailwind-merge";

// The text roles from global.css, so they merge as font sizes, not colours
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "title",
            "heading",
            "label",
            "body-lg",
            "body",
            "body-sm",
            "caption",
          ],
        },
      ],
    },
  },
});

export function cn(...classNames: ClassNameValue[]) {
  return twMerge(classNames);
}
