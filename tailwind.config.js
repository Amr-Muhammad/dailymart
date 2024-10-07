  module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lgScreen': { 'min': '1350px' },
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // Or specify a custom theme
    base: true,        // Ensure base styles are enabled
    utils: true,       // Make sure utilities like skeleton are included
  }
  ,
  // Enable JIT mode (optional, for faster builds and smaller CSS files)
  mode: 'jit',
}

