const traductions = {
  en: {
    choixEpoque: "Choose a period",
    choixVoiture: "Choose the color of your car",
    nom: "Write your name to get your car",
    galerie: "galery",
    retour:"back",
    suivant:"next",
    phrase1: "Customize your steering wheel",
    phrase2: "Customize your pattern",
    phrase3: "Customize your rims",
    phrase4: "Customize your spoiler",
    phrase5: "Customize your background",
  },
  fr: {
    choixEpoque: "Choissisez votre époque!",
    choixVoiture: "Choisis la couleur de ta voiture",
    choixVolant: "Personnalise ton volant",
    nom: "Ecris ton prénom pour récupérer ta voiture",
    galerie: "galerie",
    retour:"retour",
    suivant:"suivant",
    phrase1: "Personnalise ton volant",
    phrase2: "Personnalise ton motif",
    phrase3: "Personnalise tes jantes",
    phrase4: "Personnalise ton aileron",
    phrase5: "Personnalise ton fond",
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
    document.querySelectorAll("#flags").forEach((img) => {
      img.classList.remove("border-4", "border-blue-500");
    });
    event.target.classList.add("border-4", "border-blue-500");
    changeLanguage(selectedLanguage);
  });
});
