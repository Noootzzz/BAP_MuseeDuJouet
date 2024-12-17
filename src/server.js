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

app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

app.get("/elements/:category", (req, res) => {
  const category = req.params.category;
  const directoryPath = path.join(__dirname, "img", category);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération des éléments." });
    }
    res.json(files);
  });
});

app.post("/upload", express.json({ limit: "100mb" }), (req, res) => {
  const image = req.body.image;
  const name = req.body.name;

  console.log("Image reçue:");
  console.log("Nom reçu:", name);
  const saveDirectory = path.join(__dirname, "saved_images");

  if (!fs.existsSync(saveDirectory)) {
    console.log("dossier creer");
    fs.mkdirSync(saveDirectory, { recursive: true });
  }

  if (!image) {
    return res.status(400).json({ message: "Aucune image envoyée." });
  }

  if (!image.startsWith("data:image/png;base64,")) {
    return res
      .status(400)
      .json({ message: "Image non valide ou format incorrect." });
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const filename = Date.now() + "_" + name + "-carImage0.png";

  fs.writeFile(
    path.join(__dirname, "saved_images", filename),
    base64Data,
    "base64",
    (err) => {
      if (err) {
        console.error("Erreur lors de l'enregistrement de l'image:", err); // Log d'erreur détaillé
        return res
          .status(500)
          .json({ message: "Erreur lors de l'enregistrement de l'image." });
      }
      res.json({
        message: "Image sauvegardée avec succès !",
        filename: filename,
      });
      return filename;
    }
  );
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

// Fonction pour récupérer tous les chemins d'images (y compris dans les sous-dossiers)
function getImagesFromDirectory(dirPath, baseUrl = "") {
  let fileList = [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file); // Chemin complet du fichier
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Si c'est un sous-dossier, on appelle la fonction récursivement
      fileList = fileList.concat(
        getImagesFromDirectory(filePath, path.join(baseUrl, file)) // Ajoute le nom du sous-dossier dans le chemin relatif
      );
    } else if (file.match(/\.(webp)$/i)) {
      // Si c'est une image webp, on l'ajoute à la liste
      fileList.push(path.join(baseUrl, file)); // Le chemin relatif est utilisé ici
    }
  });

  return fileList;
}

// API pour récupérer la liste des images
app.get("/api/images", (req, res) => {
  const imageDirectory = path.join(__dirname, "img"); // Dossier d'images principal
  console.log(`Chemin du répertoire d'images : ${imageDirectory}`);

  const images = getImagesFromDirectory(imageDirectory); // Liste des images
  console.log(`Images trouvées : ${JSON.stringify(images)}`);

  res.json(images); // Retourne la liste des chemins relatifs
});

app.post("/rename", express.json(), (req, res) => {
  const { oldName, newName } = req.body;

  if (!oldName || !newName) {
    return res.status(400).json({ message: "Les noms de fichiers sont requis." });
  }

  const oldPath = path.join(__dirname, "saved_images", oldName);
  const newPath = path.join(__dirname, "saved_images", newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Erreur lors du renommage du fichier :", err);
      return res.status(500).json({
        message: "Erreur lors du renommage du fichier.",
      });
    }
    res.json({ message: "Fichier renommé avec succès.", newName });
  });
});

// Serv Start
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
