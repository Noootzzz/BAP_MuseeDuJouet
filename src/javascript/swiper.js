function go_back(event) {
  event.preventDefault();
}

function updateSlideSize(swiperInstance) {
  swiperInstance.slides.forEach((slide, index) => {
    slide.style.transform = "scale(0.9)";
    slide.style.transition = "transform 0.3s ease";
    slide.style.borderRadius = "0.5rem";
    // slide.classList.add("blur-sm");

    if (swiperInstance.activeIndex === index) {
      slide.style.transform = "scale(1.1)";
      slide.style.borderRadius = "calc(0.5rem / 1.1)";
      // slide.classList.remove("blur-sm");
    }
  });
}

let ancien = 0;
if (document.getElementById("couleurAileron_input")) {
  document.getElementById("couleurAileron_input").value = 0;
}
let lastCycleValue = null;
function inputUpdate(activeIndex, step, swiper = undefined) {
  // Calcul du cycle (1, 2, 3)
  const cycleValue = (activeIndex % 3) + 1;

  if (step === 0) {
    // Couleur voiture (pas de cycle)
    document.getElementById("couleurVoiture_input").value = activeIndex;
  } else if (step === 1) {
    // Volant
    document.getElementById("volant_input").value = `0${cycleValue}`;
  } else if (step === 2) {
    // Motif
    document.getElementById("motif_input").value = `0${cycleValue}`;
  } else if (step === 3) {
    // Jante
    document.getElementById("jante_input").value = `0${cycleValue}`;
  } else if (step === 5) {
    // Aileron
    document.getElementById("aileron_input").value = `0${+activeIndex + 1}`;

    if (cycleValue === 3 && lastCycleValue != 3) {
      // Si l'aileron est 3, on met "undefined" pour la couleur de l'aileron
      ancien = document.getElementById("couleurAileron_input").value;
      document.getElementById("couleurAileron_input").value = "undefined";
    } else {
      // Sinon, on restaure l'ancienne valeur
      document.getElementById("couleurAileron_input").value = ancien;
      change_aileron(swiper, "Bleue", 0);
    }
  } else if (step === 6) {
    document.getElementById("bg_input").value = `0${+activeIndex + 1}`;
  }
}

function updateHighlightedSlide(swiperInstance, step) {
  const activeIndex = swiperInstance.activeIndex;
  const centerSlide = swiperInstance.slides[activeIndex];
  index_active = swiperInstance.slides[activeIndex].getAttribute(
    "data-swiper-slide-index"
  );
  inputUpdate(index_active, step, swiperInstance);
  const highlightedSlide = document.getElementById("highlighted-slide");

  const bg = centerSlide.querySelector("#bg");
  const baseBackImage = centerSlide.querySelector("#Base_Back");
  const baseFrontImage = centerSlide.querySelector("#Base_Front");
  const volant = centerSlide.querySelector("#volant");
  const motif = centerSlide.querySelector("#motif");
  const jante = centerSlide.querySelector("#jante");
  const aileron_front = centerSlide.querySelector("#aileron_front");
  const aileron_back = centerSlide.querySelector("#aileron_back");
  const pneus_droit = centerSlide.querySelector("#pneus_droit");
  const pneus_gauche = centerSlide.querySelector("#pneus_gauche");

  highlightedSlide.querySelector("#Base_Back").src = baseBackImage.src;
  highlightedSlide.querySelector("#Base_Front").src = baseFrontImage.src;
  highlightedSlide.querySelector("#volant").src = volant.src;
  highlightedSlide.querySelector("#jante").src = jante.src;
  highlightedSlide.querySelector("#pneus_gauche").src = pneus_gauche.src;
  highlightedSlide.querySelector("#pneus_droit").src = pneus_droit.src;

  if (bg.style.backgroundImage != "") {
    highlightedSlide.querySelector("#bg").style.backgroundImage =
      bg.style.backgroundImage;
  }
  if (motif != undefined) {
    highlightedSlide.querySelector("#motif").src = motif.src;
    highlightedSlide.querySelector("#motif").classList.add("scale-150");
  }

  if (aileron_front != undefined && aileron_back != undefined) {
    highlightedSlide.querySelector("#aileron_front").src = aileron_front.src;
    highlightedSlide.querySelector("#aileron_front").classList.add("scale-150");
    highlightedSlide.querySelector("#aileron_back").src = aileron_back.src;
    highlightedSlide.querySelector("#aileron_back").classList.add("scale-150");
  }
  let bgColor;
  couleur_tab_E.forEach((couleur) => {
    highlightedSlide.classList.remove(`bg-${couleur}-500`);
  });
  if (centerSlide.querySelector("#peinture")) {
    bgColor = centerSlide
      .querySelector("#peinture")
      .src.match(/\/([^\/]*)\./)[1];
    highlightedSlide.classList.add(`bg-${bgColor}-500`);
  } else {
    bgColor = getComputedStyle(centerSlide).backgroundColor;
    highlightedSlide.style.backgroundColor = bgColor;
  }

  const bgColorClass = centerSlide.classList.toString().match(/bg-(\w+)-500/);
  if (bgColorClass) {
    const color = bgColorClass[1];
    highlightedSlide.className = highlightedSlide.className
      .replace(/shadow-\w+-200/, "")
      .trim();
    highlightedSlide.classList.add(`shadow-${color}-200`);
  }
}

let couleur_tab_E = ["blue", "yellow", "pink", "red", "green"];
let couleur_tab = ["Bleue", "Jaune", "Rose", "Rouge", "Vert"];

const crea_slide = (
  annee = "50's",
  couleur = undefined,
  volant = "01",
  motif = undefined,
  jante = "01",
  aileron = undefined,
  couleur_aileron = undefined
) => {
  const container = document.getElementById("swiper-wrapper");
  const template = document.getElementById("swiper-slide-template");

  let i = 0;
  container.innerHTML = "";
  let couleur_aileron_tab = couleur_tab;
  if (couleur != undefined) {
    couleur_tab = [
      couleur_tab[couleur],
      couleur_tab[couleur],
      couleur_tab[couleur],
      couleur_tab[couleur],
      couleur_tab[couleur],
    ];
    couleur_tab_E = [
      couleur_tab_E[couleur],
      couleur_tab_E[couleur],
      couleur_tab_E[couleur],
      couleur_tab_E[couleur],
      couleur_tab_E[couleur],
    ];
  }
  couleur_tab.forEach((couleur) => {
    const VoitureCard = template.cloneNode(true);
    VoitureCard.style.display = "block";
    if (step.value != 7) {
      VoitureCard.querySelector(
        "#Base_Back"
      ).src = `./src/img/${annee}/Base_Back/${annee}-Base-Si\ège-${couleur}.png`;

      VoitureCard.querySelector(
        "#volant"
      ).src = `./src/img/${annee}/Volant/${annee}-Volant-${volant}-Blanc.png`;

      VoitureCard.querySelector(
        "#Base_Front"
      ).src = `./src/img/${annee}/Base_Front/${annee}-Base-${couleur}.png`;

      VoitureCard.querySelector(
        "#jante"
      ).src = `./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png`;

      if (VoitureCard.querySelector("#peinture")) {
        VoitureCard.querySelector(
          "#peinture"
        ).src = `./src/img/Peinture/${couleur_tab_E[i]}.png`;
      }
      if (motif != undefined && motif != null) {
        VoitureCard.querySelector(
          "#motif"
        ).src = `./src/img/${annee}/Motif/${annee}-Motif-${motif}.png`;
      }
      if (
        aileron != "undefined" &&
        couleur_aileron != "undefined" &&
        aileron != undefined &&
        couleur_aileron != undefined &&
        aileron !== null &&
        couleur_aileron !== null
      ) {
        VoitureCard.querySelector(
          "#aileron_front"
        ).src = `./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-${aileron}-${couleur_aileron_tab[couleur_aileron]}.png`;
        VoitureCard.querySelector(
          "#aileron_back"
        ).src = `./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-${aileron}-${couleur_aileron_tab[couleur_aileron]}.png`;
      }
    }
    if (VoitureCard.querySelector("#ombre")) {
      VoitureCard.querySelector("#ombre").style.display = "none";
    }
    if (step.value > 4) {
      VoitureCard.classList.add(`bg-${couleur_tab_E[i]}-500`);
      VoitureCard.classList.add(`shadow-lg`);
      VoitureCard.classList.add(`shadow-${couleur_tab_E[i]}-200`);
    }
    VoitureCard.classList.add("swiper-slide");
    i++;
    container.appendChild(VoitureCard);
  });
};

const crea_template = (
  step,
  annee = "50's",
  volant = "01",
  motif = "01",
  jante = "01",
  couleur = 0,
  aileron = undefined,
  couleur_aileron = undefined
) => {
  if (step <= 0) {
    document.getElementById("swiper-slide-template").innerHTML = `
    <div id="bg">
          <img
            id="peinture"
            src="./src/img/Peinture/${couleur_tab_E[couleur]}.png"
            alt="Image peinture"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75"
          />    
          <img
            style="display: none"
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            style="display: none"
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
          style="display: none"
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
          style="display: none"
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
          style="display: none"
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
          style="display: none"
            id="jante"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step == 1) {
    document.getElementById("swiper-slide-template").innerHTML = `
    <div id="bg">
          <img
            style="display: none"
            id="peinture"
            src="./src/img/Peinture/${couleur_tab_E[couleur]}.png"
            alt="Image peinture"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75"
          />    
          <img
            id="pneus_gauche"
            style="display: none"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            style="display: none"
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-[20%] left-[35%]"
            style="transform: scale(5)"
          />
          <img
            id="Base_Front"
            style="display: none"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="pneus_droit"
            style="display: none"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="jante"
            style="display: none"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step <= 2) {
    document.getElementById("swiper-slide-template").innerHTML = `
  <div id="bg" style="overflow: hidden;"> 
          <img
            style="display: none"
            id="peinture"
            src="./src/img/Peinture/${couleur_tab_E[couleur]}.png"
            alt="Image peinture"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75"
          />       
          <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="motif"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  scale-150"
          /></div> `;
  } else if (step <= 4) {
    document.getElementById("swiper-slide-template").innerHTML = `
  <div id="bg" style="overflow: hidden;"> 
          <img
            style="display: none"
            id="peinture"
            src="./src/img/Peinture/${couleur_tab_E[couleur]}.png"
            alt="Image peinture"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75"
          />       
          <img
            style="display: none"
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            style="display: none"
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            style="display: none"
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            style="display: none"
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            style="display: none"
            id="motif"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            style="display: none"
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
          />
          <img
            id="single_jante"
            src="./src/img/${annee}/jantes_single/${annee}-Jantes-${jante}.png"
            alt="Image Single Jante"
            class="absolute left-[30%] "
            style="transform: scale(0.7)"
          />
          <img
            id="jante"
            style="display: none"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step <= 5) {
    document.getElementById("swiper-slide-template").innerHTML = `
  <div id="bg">     <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="aileron_back"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
            <img
            id="aileron_front"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="motif"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step > 5) {
    document
      .getElementById("swiper-slide-template")
      .classList.add("w-full", "h-full");
    document.getElementById("swiper-slide-template").innerHTML = `
          <img
            id="ombre"
            src="./src/img/Fond/Ombre.png"
            alt="Image Ombre"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[54%] transform scale-150 blur opacity-75 "
          />
          <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Gauche.png"
            alt="Image pneus gauche"
            class=" absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/${annee}-Base-Siège-${couleur_tab[couleur]}.png"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="volant"
            src="./src/img/50's/Volant/50's-Volant-${volant}-Blanc.png"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="aileron_back"
            src="./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-${aileron}-${couleur_tab[couleur_aileron]}.png"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="aileron_front"
            src="./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-${aileron}-${couleur_tab[couleur_aileron]}.png"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />

          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/${annee}-Base-${couleur_tab[couleur]}.png"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="motif"
            src="./src/img/${annee}/Motif/${annee}-Motif-${motif}.png"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/${annee}-Pneus-Droit.png"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/${annee}-Jantes-${jante}.png"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[47%]"
          />
         
          <div id="bg"></div> `;
    if (couleur_aileron == "undefined" || couleur_aileron == undefined) {
      document
        .getElementById("swiper-slide-template")
        .querySelector(
          "#aileron_back"
        ).src = `./src/img/${annee}/Aileron_Back/${annee}-Aileron-Back-03.png`;
      document
        .getElementById("swiper-slide-template")
        .querySelector(
          "#aileron_front"
        ).src = `./src/img/${annee}/Aileron_Front/${annee}-Aileron-Front-03.png`;
    }
  }
};
