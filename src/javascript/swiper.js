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

  const highlightedSlide = document.getElementById("highlighted-slide");

  // Récupérer toutes les images de la diapositive centrale
  const centerSlideImages = centerSlide.querySelectorAll("img");

  // Si des images existent dans la diapositive centrale
  if (centerSlideImages.length > 0) {
    // Vider les images existantes dans la section mise en avant
    highlightedSlide.innerHTML = "";

    // Ajouter les images de la diapositive centrale dans la section mise en avant
    centerSlideImages.forEach((image) => {
      const newImage = document.createElement("img");
      newImage.src = image.src;
      newImage.alt = image.alt;
      newImage.classList.add(
        "absolute",
        "top-1/2",
        "left-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "scale-150"
      );

      // Ajouter l'image dans le conteneur "highlighted-slide"
      highlightedSlide.appendChild(newImage);
    });

    const computedStyle = getComputedStyle(centerSlide);
    const backgroundColor = computedStyle.backgroundColor;

    if (backgroundColor) {
      highlightedSlide.style.backgroundColor = backgroundColor; // Appliquer la couleur de fond
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true, // Loop activé
    loopedSlides: 5, // Nombre correct de slides à dupliquer pour le loop
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  swiper.on("slideChange", () => {
    updateSlideSize(swiper);
    updateHighlightedSlide(swiper);
  });

  updateSlideSize(swiper);
  updateHighlightedSlide(swiper);
});
