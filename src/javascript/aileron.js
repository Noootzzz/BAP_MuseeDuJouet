const change_aileron = (swiperInstance, couleur, index_couleur) => {
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
    type_aileron = 2;
  } else if (
    aileronFrontSrc.includes("-04") ||
    aileronBackSrc.includes("-04")
  ) {
    type_aileron = 4;
  }
  if (type_aileron === 1 || type_aileron === 2) {
    centerSlide.querySelector(
      "#aileron_front"
    ).src = `src/img/${annee_input.value}/Aileron_Front/${annee_input.value}-Aileron-Front-0${type_aileron}-${couleur}.png`;
    centerSlide.querySelector(
      "#aileron_back"
    ).src = `src/img/${annee_input.value}/Aileron_Back/${annee_input.value}-Aileron-Back-0${type_aileron}-${couleur}.png`;
    document.getElementById("couleurAileron_input").value = `${index_couleur}`;
  } else if (type_aileron === 3) {
    // Si c'est le type 3, on ne change pas la couleur
    centerSlide.querySelector(
      "#aileron_front"
    ).src = `src/img/${annee_input.value}/Aileron_Front/${annee_input.value}-Aileron-Front-03.png`;
    centerSlide.querySelector(
      "#aileron_back"
    ).src = `src/img/${annee_input.value}/Aileron_Back/${annee_input.value}-Aileron-Back-03.png`;
    document.getElementById("couleurAileron_input").value = `${"undefined"}`;
  } else if (type_aileron === 4) {
    // Si c'est le type 3, on ne change pas la couleur
    centerSlide.querySelector(
      "#aileron_front"
    ).src = `src/img/${annee_input.value}/Aileron_Front/${annee_input.value}-Aileron-Front-04.png`;
    centerSlide.querySelector(
      "#aileron_back"
    ).src = `src/img/${annee_input.value}/Aileron_Back/${annee_input.value}-Aileron-Back-04.png`;
    document.getElementById("couleurAileron_input").value = `${"undefined"}`;
  }

  // Met à jour le slide mis en surbrillance

  updateHighlightedSlide(swiperInstance, 4);
};

const change_bg = (swiperInstance, couleur, index_couleur) => {
  const activeIndex = swiperInstance.activeIndex;
  const centerSlide = swiperInstance.slides[activeIndex];

  const bgsrc = centerSlide.querySelector("#bg").style.backgroundImage;
  let type_bg = 3; // Par défaut, on assume que c'est le type 3
  if (bgsrc.includes("-01")) {
    type_bg = 1; // Type 1 si le lien contient "-01-"
  } else if (bgsrc.includes("-02")) {
    type_bg = 2; // Type 2 si le lien contient "-02-"
  }

  // Changement de l'image de fond selon le type (1, 2 ou 3)
  if (type_bg === 1 || type_bg === 2) {
    centerSlide.querySelector(
      "#bg"
    ).style.backgroundImage = `url('src/img/Fond/Fond-0${type_bg}.png')`;
    document.getElementById("couleurFond_input").value = "undefined";
  } else if (type_bg === 3) {
    centerSlide.querySelector(
      "#bg"
    ).style.backgroundImage = `url("src/img/Fond/Fond-03-${couleur}.png")`;
    document.getElementById("couleurFond_input").value = `${index_couleur}`;
  }
  updateHighlightedSlide(swiperInstance, 4);
};
