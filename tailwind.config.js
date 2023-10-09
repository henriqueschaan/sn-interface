/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'custom': '0px 4px 21px -4px rgba(0, 0, 0, 0.40)',
        'custom2': '0px 4px 21px -4px rgba(0, 0, 0, 0.20)',
        'custom3': '0 -1px 4px rgba(0, 0, 0, 0.20)',
      },
      backgroundImage: {
        'tile': "url('/img/tile.png')",
      },
      width: {
        'custom': 'calc(100vw - 743px)'
    }
    },
  },
  plugins: [],
}

