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
        ghBg: "#0d1117",      // Exact GitHub dark mode canvas background
        ghSection: "#161b22", // Exact GitHub card/section fill
        ghBorder: "#30363d",  // Muted, subtle border lines (not harsh white)
        ghText: "#e6edf3",    // Crisp text color
        ghTextMuted: "#8d96a0", // Secondary gray text
        ghSuccess: "#238636"  // Iconic green button
      },
    },
  },
  plugins: [],
}