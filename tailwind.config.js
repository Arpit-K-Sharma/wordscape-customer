/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    spacing:{
      '1': "100px",
      '5': "1.25rem",
      '6': "1.5rem",
      '7': "1.75rem",
      '8': "2rem",
      '9': "2.25rem",
      '10': "2.5rem",
    },
    extend: {
      
      margin:{
        '1': '10px'
      },
      fontSize: {
        'title': '9rem'
      },
      fontFamily:{
        'archivo': ['Archivo', 'sans-serif'],
      },
      fontWeight:{
        'thick': '600'
      },
      colors: {
        c1: "#007ace",
        m1: ""
      },
      
    },
  },
  plugins: [require("daisyui")],
};
