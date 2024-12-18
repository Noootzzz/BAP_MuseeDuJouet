const traductions = {
  en: {
    choixEpoque: "Choose a period",
    choixVoiture: "Choose the color of your car",
    choixVolant: "Personalize your wheel",
    nom: "Write your name to get your car",
    galerie: "galery",
  },
  fr: {
    choixEpoque: "Choissisez votre époque!",
    choixVoiture: "Choisis la couleur de ta voiture",
    choixVolant: "Personnalise ton volant",
    nom: "Ecris ton prénom pour récupérer ta voiture",
    galerie: "galerie",
  },
};

function changeLanguage(language) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (traductions[language][key]) {
      if (element.value) {
        element.value = traductions[language][key];
      } else {
        element.textContent = traductions[language][key];
      }
    }
  });
  localStorage.setItem("language", language);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "fr";
  changeLanguage(savedLanguage);
});

document.querySelectorAll("#changeLanguage").forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("Langue changée");
    const selectedLanguage = event.target.getAttribute("data-lang");
    changeLanguage(selectedLanguage);
  });
});
