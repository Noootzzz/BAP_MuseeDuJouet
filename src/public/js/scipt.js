async function loadImages(category) {
  const response = await fetch(`/elements/${category}`);
  const images = await response.json();

  const container = document.getElementById("images-container");
  container.innerHTML = ""; 

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `/images/${category}/${image}`;
    imgElement.alt = image;
    imgElement.onclick = () => selectImage(category, image);
    container.appendChild(imgElement);
  });
}

function selectImage(category, image) {
  localStorage.setItem(category, image); 
  alert(`${image} sélectionnée pour ${category}!`);
}

document.addEventListener("DOMContentLoaded", () => {
  const category = document.body.getAttribute("data-category");
  loadImages(category);
});
