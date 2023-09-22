/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        garden: '#291E00'
      },
      screens: {
        'sm': '395px',    // Pequenos dispositivos como celulares
        'md': '768px',    // Dispositivos médios como tablets
        'lg': '1024px',   // Dispositivos grandes como laptops
        'xl': '1280px',   // Dispositivos extra grandes
      },
    },
  },
  daisyui:{
    themes:[
      "garden"
    ]
  },
  plugins: [require("daisyui")],

}

