const volant = ["01", "02", "03"];
const motif = ["01", "02", "03"];
const jante = ["01", "02", "03"];
const aileron = ["01", "02", "03"];
const phrases = [
  "Personnalise ton volant",
  "Personnalise ton motif",
  "Personnalise tes jantes",
  "Personnalise ton aileron",
];

couleur_tab_aileron = couleur_tab;

function crea_perso(step, annee, couleur = 0) {
  console.log(step);
  document.getElementById("perso_phrase").innerHTML = phrases[step - 1];
  const container = document.getElementById("swiper-wrapper");
  const template = document
    .getElementById("swiper-wrapper")
    .querySelector("div");

  container.innerHTML = "";
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 3; i++) {
      const VoitureCard = template.cloneNode(true);
      VoitureCard.style.display = "block";
      if (step == 1 && i <= volant.length - 1) {
        VoitureCard.querySelector(
          "#volant"
        ).src = `./src/img/${annee}/Volant/Low-50's-Volant-${volant[i]}.webp`;
      } else if (step == 2 && i <= motif.length - 1) {
        VoitureCard.querySelector(
          "#motif"
        ).src = `./src/img/${annee}/Motif/Low-50's-Motif-${motif[i]}.webp`;
      } else if (step == 3 && i <= jante.length - 1) {
        VoitureCard.querySelector(
          "#jante"
        ).src = `./src/img/${annee}/Jantes/Low-50's-Jantes-${jante[i]}.webp`;
      } else if (step == 4 && i <= aileron.length - 1) {
        if (i != 2) {
          VoitureCard.querySelector(
            "#aileron_back"
          ).src = `./src/img/${annee}/Aileron_Back/Low-50's-Aileron-Back-${aileron[i]}-${couleur_tab_aileron[couleur]}.webp`;
          VoitureCard.querySelector(
            "#aileron_front"
          ).src = `./src/img/${annee}/Aileron_Front/Low-50's-Aileron-Front-${aileron[i]}-${couleur_tab_aileron[couleur]}.webp`;
        } else {
          VoitureCard.querySelector(
            "#aileron_back"
          ).src = `./src/img/${annee}/Aileron_Back/Low-50's-Aileron-Back-03.webp`;
          VoitureCard.querySelector(
            "#aileron_front"
          ).src = `./src/img/${annee}/Aileron_Front/Low-50's-Aileron-Front-03.webp`;
        }
      }
      VoitureCard.classList.add(`bg-${couleur_tab_E[i]}-500`);
      VoitureCard.classList.add("swiper-slide");
      container.appendChild(VoitureCard);
    }
  }
}
