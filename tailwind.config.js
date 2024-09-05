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
    themes: [
      // 'light', // You can specify 'light' or other themes like 'dark', 'cupcake', etc.
    ]
  }
  ,
  // Enable JIT mode (optional, for faster builds and smaller CSS files)
  mode: 'jit',
}

