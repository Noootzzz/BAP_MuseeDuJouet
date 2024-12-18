const volant = ["01", "02", "03"];
const motif = ["01", "02", "03"];
const jante = ["01", "02", "03"];
const aileron = ["01", "02", "03"];
const fond = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
const phrases = [
  "Personnalise ton volant",
  "Personnalise ton motif",
  "Personnalise tes jantes",
  "Personnalise ton aileron",
  "Personnalise ton fond",
];

couleur_tab_aileron = couleur_tab;

function crea_perso(step, annee, couleur = 0) {
  document.getElementById("perso_phrase").innerHTML = phrases[step - 1];
  document
    .getElementById("perso_phrase")
    .setAttribute("data-translate", `phrase${step}`);
  const container = document.getElementById("swiper-wrapper");
  const template = document
    .getElementById("swiper-wrapper")
    .querySelector("div");

  let limit = 3;
  let step_limit = 2;
  if (step == 5) {
    limit = 10;
    step_limit = 1;
  } else if (step == 4) {
    limit = 4;
    step_limit = 1;
  }
  container.innerHTML = "";
  for (let j = 0; j < step_limit; j++) {
    for (let i = 0; i < limit; i++) {
      const VoitureCard = template.cloneNode(true);
      VoitureCard.style.display = "block";
      if (step == 1 && i <= volant.length - 1) {
        VoitureCard.querySelector(
          "#volant"
        ).src = `./src/img/${annee}/Volant/${annee}-Volant-${volant[i]}-Blanc.png`;
      } else if (step == 2 && i <= motif.length - 1) {
        VoitureCard.querySelector(
          "#motif"
        ).src = `./src/img/${annee}/Motif/${annee}-Motif-${motif[i]}.png`;
      } else if (step == 3 && i <= jante.length - 1) {
        VoitureCard.querySelector(
          "#jante"
        ).src = `./src/img/${annee}/Jantes/${annee}-Jantes-${jante[i]}.png`;
      } else if (step == 4 && i <= aileron.length) {
        if (i == aileron.length) {
          VoitureCard.querySelector(
            "#aileron_back"
          ).src = `./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-04.png`;
          VoitureCard.querySelector(
            "#aileron_front"
          ).src = `./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-04.png`;
        } else if (i != 2) {
          VoitureCard.querySelector(
            "#aileron_back"
          ).src = `./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-${aileron[i]}-${couleur_tab_aileron[couleur]}.png`;
          VoitureCard.querySelector(
            "#aileron_front"
          ).src = `./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-${aileron[i]}-${couleur_tab_aileron[couleur]}.png`;
        } else {
          VoitureCard.querySelector(
            "#aileron_back"
          ).src = `./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-03.png`;
          VoitureCard.querySelector(
            "#aileron_front"
          ).src = `./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-03.png`;
        }
      }
      if (step == 5 && i <= fond.length - 1) {
        VoitureCard.querySelector("#volant").style.display = "none";
        VoitureCard.querySelector("#motif").style.display = "none";
        VoitureCard.querySelector("#jante").style.display = "none";
        VoitureCard.querySelector("#aileron_back").style.display = "none";
        VoitureCard.querySelector("#aileron_front").style.display = "none";
        VoitureCard.querySelector("#pneus_gauche").style.display = "none";
        VoitureCard.querySelector("#Base_Back").style.display = "none";
        VoitureCard.querySelector("#Base_Front").style.display = "none";
        VoitureCard.querySelector("#pneus_droit").style.display = "none";
        VoitureCard.querySelector(
          "#bg"
        ).style.backgroundImage = `url("src/img/Fond/Fond-${fond[i]}.png")`;

        VoitureCard.classList.remove(`bg-${couleur_tab_E[i]}-500`);
      } else {
        VoitureCard.classList.add(`bg-${couleur_tab_E[i]}-500`);
      }
      VoitureCard.classList.add("swiper-slide");
      container.appendChild(VoitureCard);
    }
  }
}
