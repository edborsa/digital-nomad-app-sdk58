const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: color("background"),
        surface: color("surface"),
        border: color("border"),
        foreground: color("foreground"),
        muted: color("muted"),
        primary: {
          DEFAULT: color("primary"),
          foreground: color("primary-foreground"),
        },
        success: { DEFAULT: color("success"), muted: color("success-muted") },
        error: { DEFAULT: color("error"), muted: color("error-muted") },
        warning: { DEFAULT: color("warning"), muted: color("warning-muted") },
        info: { DEFAULT: color("info"), muted: color("info-muted") },
      },
      // One family per weight, so native picks the right font file
      fontFamily: {
        poppins: ["PoppinsRegular"],
        "poppins-semibold": ["PoppinsSemiBold"],
      },
      // Text roles; line heights leave room for large font scales
      fontSize: {
        display: ["28px", { lineHeight: "36px" }],
        title: ["22px", { lineHeight: "30px" }],
        heading: ["16px", { lineHeight: "24px" }],
        label: ["14px", { lineHeight: "20px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        body: ["16px", { lineHeight: "24px" }],
        "body-sm": ["14px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "16px" }],
      },
      boxShadow: {
        primary: "3px 3px 10px 3px rgb(var(--color-primary) / 0.4)",
      },
    },
  },
};
