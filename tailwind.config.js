/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.vue',
    './src/*.vue',
    './src/App.vue'
  ],
  theme: {
    extend: {

    },
    fontFamily: {      
      'sans': ['Poppins', 'sans-serif']
    }
  },
  plugins: [
    require("daisyui"), 
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake",
    {
      hattertheme: {
        "primary": "#F48023",
        "primary/50": "#FCF4EC",
        "black": "#000",
        "white": "#FFF",
        "text": "#000",
        "neutral": "#EAEAEA",
        "secondary": "#808080",
        "accent": "#FFF",
        "base-100": "#FFF",
        "info": "#1682FD",
        "success": "#FFF",
        "warning": "#FFF",
        "error": "#FFF",
      }
    }
  ],
  }
}

