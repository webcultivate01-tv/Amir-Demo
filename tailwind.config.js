export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        seasons: ['"The Seasons"', '"Playfair Display"', "serif"],
        poppins: ['"Poppins"', "ui-sans-serif", "system-ui", "sans-serif"],
        /* News & Media (magazine) design system */
        syne: ['"Syne"', "ui-sans-serif", "sans-serif"],
        anton: ['"Anton"', "ui-sans-serif", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#4f46e5", soft: "#eef0ff" },
        ink: "#0f172a",
        mist: { DEFAULT: "#f3f5fb", deep: "#e9edf7", line: "#dde3f0" },
        amir: { DEFAULT: "#EC1F36", dark: "#B9101F", ink: "#271719" },
        /* News & Media (magazine) design tokens */
        mag: {
          crimson: "#A8002F",
          accent: "#E31B23",
          cream: "#EEEBE0",
          ink: "#1C1C1C",
          charcoal: "#111111",
          offwhite: "#F9F9F9",
          maroon: "#78191D",
        },
      },
    },
  },
  plugins: [],
};
