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

function updateHighlightedSlide(swiperInstance) {
  const activeIndex = swiperInstance.activeIndex;
  const centerSlide = swiperInstance.slides[activeIndex];
  index_active = swiperInstance.slides[activeIndex].getAttribute(
    "data-swiper-slide-index"
  );

  const highlightedSlide = document.getElementById("highlighted-slide");

  const baseBackImage = centerSlide.querySelector("#Base_Back");
  const baseFrontImage = centerSlide.querySelector("#Base_Front");

  if (baseBackImage && baseFrontImage) {
    highlightedSlide.querySelector("#Base_Back").src = baseBackImage.src;
  }

  if (baseFrontImage) {
    highlightedSlide.querySelector("#Base_Front").src = baseFrontImage.src;
  }
  const bgColor = getComputedStyle(centerSlide).backgroundColor;
  highlightedSlide.style.backgroundColor = bgColor;

  return index_active;
}

const couleur_tab_E = ["blue", "yellow", "pink", "red", "green"];
const couleur_tab = ["Bleue", "Jaune", "Rose", "Rouge", "Vert"];

const crea_slide = (annee = "50's") => {
  const container = document.getElementById("swiper-wrapper");
  const template = document.getElementById("swiper-slide-template");

  let i = 0;
  container.innerHTML = "";
  couleur_tab.forEach((couleur) => {
    const VoitureCard = template.cloneNode(true);
    VoitureCard.style.display = "block";
    VoitureCard.querySelector(
      "#Base_Back"
    ).src = `./src/img/${annee}/Base_Back/Low-50\'s-Base-Si\ège-${couleur}.webp`;

    VoitureCard.querySelector(
      "#Base_Front"
    ).src = `./src/img/${annee}/Base_Front/Low-50\'s-Base-${couleur}.webp`;

    VoitureCard.classList.add(`bg-${couleur_tab_E[i]}-500`);
    VoitureCard.classList.add("swiper-slide");
    i++;
    container.appendChild(VoitureCard);
  });
};

const crea_template = (
  annee = "50's",
  volant = "01",
  motif = undefined,
  jante = "01",
  couleur = "bleue",
  aileron = undefined,
  couleur_aileron = undefined
) => {
  document.getElementById("swiper-slide-template").innerHTML = `
          <img
            id="pneus_gauche"
            src="./src/img/${annee}/Pneu/Low-50's-Pneus-Gauche.webp"
            alt="Image pneus gauche"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            id="Base_Back"
            src="./src/img/${annee}/Base_Back/Low-50's-Base-Siège-${couleur}.webp"
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
            src="./src/img/${annee}/Base_Front/Low-50's-Base-${couleur}.webp"
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
          />
        </div>`;
  if (motif) {
    document.getElementById("swiper-slide-template").innerHTML += `
      <img
        id="motif"
        src="./src/img/${annee}/Motif\Low-50's-Motif-${motif}.webp"
        alt="Image Jante"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />`;
  }
  if (aileron && couleur_aileron) {
    document.getElementById("swiper-slide-template").innerHTML += `      
      <img
        id="aileron_front"
        src="./src/img/${annee}/Aileron_Front\Low-50's-Aileron-Front-${aileron}-${couleur_aileron}.webp"
        alt="Image Jante"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <img
        id="aileron_back"
        src="./src/img/${annee}/Aileron_Back\Low-50's-Aileron-Back-${aileron}-${couleur_aileron}.webp"
        alt="Image Jante"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />`;
  }
};
