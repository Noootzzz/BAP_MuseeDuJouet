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
  document.getElementById("couleur_input").value = index_active;
  console.log(index_active);

  const highlightedSlide = document.getElementById("highlighted-slide");

  const centerSlideImages = centerSlide.querySelectorAll("img");

  if (centerSlideImages.length > 0) {
    highlightedSlide.innerHTML = "";

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

      highlightedSlide.appendChild(newImage);
    });

    const computedStyle = getComputedStyle(centerSlide);
    const backgroundColor = computedStyle.backgroundColor;

    if (backgroundColor) {
      highlightedSlide.style.backgroundColor = backgroundColor;
    }
  }
}
