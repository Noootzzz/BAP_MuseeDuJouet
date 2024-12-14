function updateSlideSize(swiperInstance) {
  swiperInstance.slides.forEach((slide, index) => {
    slide.style.transform = "scale(0.9)";
    slide.style.transition = "transform 0.3s ease";
    slide.style.borderRadius = "0.5rem";

    if (swiperInstance.activeIndex === index) {
      slide.style.transform = "scale(1.1)";
      slide.style.borderRadius = "calc(0.5rem / 1.1)";
    }
  });
}

let ancien = 0;
document.getElementById("couleurAileron_input").value = 0;
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
    document.getElementById("aileron_input").value = `0${cycleValue}`;

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
    // bg
    document.getElementById("bg_input").value = `0${cycleValue}`;

    console.log(cycleValue);
    if (cycleValue != 3) {
      // Si l'aileron est 3, on met "undefined" pour la couleur de l'aileron
      ancien = document.getElementById("couleurFond_input").value;
      document.getElementById("couleurFond_input").value = "undefined";
    } else {
      document.getElementById("couleurFond_input").value = 0;
      console.log(0);
      change_bg(swiper, "Bleue", 0);
    }
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

  highlightedSlide.querySelector("#Base_Back").src = baseBackImage.src;
  highlightedSlide.querySelector("#Base_Front").src = baseFrontImage.src;
  highlightedSlide.querySelector("#volant").src = volant.src;
  highlightedSlide.querySelector("#jante").src = jante.src;

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
  const bgColor = getComputedStyle(centerSlide).backgroundColor;
  highlightedSlide.style.backgroundColor = bgColor;
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
    VoitureCard.querySelector(
      "#Base_Back"
    ).src = `./src/img/${annee}/Base_Back/Low-50\'s-Base-Si\ège-${couleur}.webp`;

    VoitureCard.querySelector(
      "#volant"
    ).src = `./src/img/${annee}/Volant/Low-50's-Volant-${volant}.webp`;

    VoitureCard.querySelector(
      "#Base_Front"
    ).src = `./src/img/${annee}/Base_Front/Low-50\'s-Base-${couleur}.webp`;

    VoitureCard.querySelector(
      "#jante"
    ).src = `./src/img/${annee}/Jantes/Low-50's-Jantes-${jante}.webp`;

    if (motif !== undefined && motif !== "undefined" && motif !== null) {
      VoitureCard.querySelector(
        "#motif"
      ).src = `./src/img/${annee}/Motif/Low-50's-Motif-${motif}.webp`;
    }
    if (
      aileron !== undefined &&
      couleur_aileron !== undefined &&
      aileron !== "undefined" &&
      couleur_aileron !== "undefined" &&
      aileron !== null &&
      couleur_aileron !== null
    ) {
      VoitureCard.querySelector(
        "#aileron_front"
      ).src = `./src/img/${annee}/Aileron_Front/Low-50's-Aileron-Front-${aileron}-${couleur_aileron_tab[couleur_aileron]}.webp`;
      VoitureCard.querySelector(
        "#aileron_back"
      ).src = `./src/img/${annee}/Aileron_Back/Low-50's-Aileron-Back-${aileron}-${couleur_aileron_tab[couleur_aileron]}.webp`;
    }

    VoitureCard.classList.add(`bg-${couleur_tab_E[i]}-500`);
    VoitureCard.classList.add("swiper-slide");
    i++;
    container.appendChild(VoitureCard);
  });
};

const crea_template = (
  step,
  annee = "50's",
  volant = "01",
  motif = undefined,
  jante = "01",
  couleur = 0,
  aileron = undefined,
  couleur_aileron = undefined
) => {
  if (step <= 1) {
    document.getElementById("swiper-slide-template").innerHTML = `
    <div id="bg">
          <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Gauche.webp"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/Low-50's-Base-Siège-${couleur_tab[couleur]}.webp"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="volant"
            src="./src/img/${annee}/Volant/Low-50's-Volant-${volant}.webp"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/Low-50's-Base-${couleur_tab[couleur]}.webp"
            alt="Image Base Front"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="pneus_droit"
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Droit.webp"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/Low-50's-Jantes-${jante}.webp"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step <= 3) {
    document.getElementById("swiper-slide-template").innerHTML = `
  <div id="bg">     <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Gauche.webp"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/Low-50's-Base-Siège-${couleur_tab[couleur]}.webp"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="volant"
            src="./src/img/${annee}/Volant/Low-50's-Volant-${volant}.webp"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/Low-50's-Base-${couleur_tab[couleur]}.webp"
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
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Droit.webp"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/Low-50's-Jantes-${jante}.webp"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  } else if (step >= 5) {
    document.getElementById("swiper-slide-template").innerHTML = `
   <div id="bg">      <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Gauche.webp"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/Low-50's-Base-Siège-${couleur_tab[couleur]}.webp"
            alt="Image Base Back"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="volant"
            src="./src/img/${annee}/Volant/Low-50's-Volant-${volant}.webp"
            alt="Image Volant"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="aileron_front"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="aileron_back"
            src=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Front"
            src="./src/img/${annee}/Base_Front/Low-50's-Base-${couleur_tab[couleur]}.webp"
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
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Droit.webp"
            alt="Image Pneus Droit"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="jante"
            src="./src/img/${annee}/Jantes/Low-50's-Jantes-${jante}.webp"
            alt="Image Jante"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /></div> `;
  }
};
