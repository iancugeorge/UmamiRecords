module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0055', // Magenta
        secondary: '#ffcc00', // Yellow
        dark: '#0a0a0a',
        light: '#f5f5f5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'], // Bold Display Font
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
