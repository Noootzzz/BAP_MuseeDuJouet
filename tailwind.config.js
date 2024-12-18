/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./epoque.html",
    "./voiture.html",
    "./personnalisation.html",
    "./perso_aileron.html",
    "./perso_fond.html",
    "./name.html",
    "./qr.html",
    "./galerie.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      scale: {
        200: "2",
        300: "3",
      },
    },
  },
  plugins: [],
};
