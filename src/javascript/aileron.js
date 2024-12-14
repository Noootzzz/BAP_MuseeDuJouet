const change_aileron = (swiperInstance, couleur) => {
  const activeIndex = swiperInstance.activeIndex;
  const centerSlide = swiperInstance.slides[activeIndex];

  // Vérification du type d'aileron en fonction de l'URL de l'image actuelle
  const aileronFrontSrc = centerSlide.querySelector("#aileron_front").src;
  const aileronBackSrc = centerSlide.querySelector("#aileron_back").src;

  // Détermine le type d'aileron (1 ou 2 ou 3) en fonction de l'URL
  let type_aileron = 3; // Par défaut, on assume que c'est le type 3
  if (aileronFrontSrc.includes("-01-") || aileronBackSrc.includes("-01-")) {
    type_aileron = 1; // Type 1 si le lien contient "-01-"
  } else if (
    aileronFrontSrc.includes("-02-") ||
    aileronBackSrc.includes("-02-")
  ) {
    type_aileron = 2; // Type 2 si le lien contient "-02-"
  }

  // Si c'est le type 1 ou 2, on met à jour la couleur
  if (type_aileron === 1 || type_aileron === 2) {
    centerSlide.querySelector(
      "#aileron_front"
    ).src = `src/img/50's/Aileron_Front/Low-50's-Aileron-Front-0${type_aileron}-${couleur}.webp`;
    centerSlide.querySelector(
      "#aileron_back"
    ).src = `src/img/50's/Aileron_Back/Low-50's-Aileron-Back-0${type_aileron}-${couleur}.webp`;
  } else {
    // Si c'est le type 3, on ne change pas la couleur
    centerSlide.querySelector(
      "#aileron_front"
    ).src = `src/img/50's/Aileron_Front/Low-50's-Aileron-Front-03.webp`;
    centerSlide.querySelector(
      "#aileron_back"
    ).src = `src/img/50's/Aileron_Back/Low-50's-Aileron-Back-03.webp`;
  }

  // Met à jour le slide mis en surbrillance
  updateHighlightedSlide(swiperInstance, 4);
};
