import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121417",
        foxDark: "#12141733",
        lightBlack: "rgba(0, 0, 0, 0.60)",
        lightDark: "rgba(18, 20, 23, 0.70)",
        lightGrey: "rgba(18, 20, 23, 0.20)",
        orange: "#F4C550",
        lightOrange: "#f4c550a6",
        banana: "#FBE9BA",
        green: "#38CD3E",
        darkGreen: "#9FBAAE",
        lightGreen: "#CBDED3",
        darkBlue: "#9FB7CE",
        lightBlue: "#BFD6EA",
        rose: "#E0A39A",
        pink: "#F2C0BD",
        lightRose: "#f0aa8da6",
        peach: "#F0AA8D",
        lightPeach: "#f0aa8da6",
        powder: "#F4C8BA",
        heroBg: "#F8F8F8",
        greyLabel: "#8A8A89",
        goldStar: "#FFC531",
        foxGreen: "#44e49db3",
      },
      backgroundImage: {
        tumbaThemaA: "linear-gradient(180deg, #EEB055 0%, #D08F38 100%)",
        tumbaThemaB: "linear-gradient(180deg, #295761 0%, #183E49 100%)",
        tumbaThemaC: "linear-gradient(180deg, #314B6E 0%, #1F385A 100%)",
        tumbaThemaD: "linear-gradient(180deg, #B03F3E 0%, #982A27 100%)",
        tumbaThemaF: "linear-gradient(180deg, #E17650 0%, #CA5B38 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
