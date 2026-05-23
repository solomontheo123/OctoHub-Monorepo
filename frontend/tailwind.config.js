/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ghBg: "#0d1117",      // Main background canvas
        ghSection: "#161b22", // Sidebar and card background
        ghBorder: "#30363d",  // Thin lines and borders
        ghText: "#e6edf3",    // Primary light text
        ghTextMuted: "#848d97", // Secondary gray text
        ghSuccess: "#238636"  // Iconic green button
      },
    },
  },
  plugins: [],
}