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

// Serv Start
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
