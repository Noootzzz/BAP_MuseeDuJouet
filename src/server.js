const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "saved_images/");
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  res.send("Serveur de personnalisation de voiture opérationnel");
});

app.get("/elements/:category", (req, res) => {
  const category = req.params.category;
  const directoryPath = path.join(__dirname, "public/images", category);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération des éléments." });
    }
    res.json(files);
  });
});

app.post("/upload", upload.single("carImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image envoyée." });
  }
  res.json({
    message: "Image sauvegardée avec succès !",
    filename: req.file.filename,
  });
});

app.get("/gallery", (req, res) => {
  const galleryPath = path.join(__dirname, "saved_images");

  fs.readdir(galleryPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération de la galerie." });
    }
    res.json(files);
  });
});

app.post("/combine", async (req, res) => {
  const { images, width, height } = req.body; // Liste des images et dimensions de l'image finale

  if (!images || images.length === 0) {
    return res.status(400).json({ message: "Aucune image fournie." });
  }

  try {
    const canvas = createCanvas(width || 800, height || 600);
    const ctx = canvas.getContext("2d");

    // Charger et dessiner chaque image sur le canvas
    for (const imageName of images) {
      const imagePath = path.join(__dirname, "public/images", imageName);
      if (!fs.existsSync(imagePath)) {
        return res
          .status(404)
          .json({ message: `Image non trouvée : ${imageName}` });
      }

      const image = await loadImage(imagePath);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Ajustement des images
    }

    // Sauvegarder l'image finale
    const outputFilename = `combined-${Date.now()}.png`;
    const outputPath = path.join(__dirname, "saved_images", outputFilename);

    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    out.on("finish", () => {
      res.json({
        message: "Image combinée créée avec succès !",
        filename: outputFilename,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l'image." });
  }
});
// Serv Start
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
