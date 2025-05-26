const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const { connectMongoDb } = require("./connection");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

// mongodb
connectMongoDb(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("mongodb connected");
});

// image compression

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
app.post("/imageCompressor", upload.single("image"), (req, res, next) => {
  const file = req.file;
  var ext;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 404;
    return next(error);
  }
  if (file.mimetype == "image/jpeg") {
    ext = "jpg";
  }
  if (file.mimetype == "image/png") {
    ext = "png";
  }
  res.render("image.ejs", { name: file.filename, ext: ext });
});

app.post("/compress/uploads/:name/:ext", async (req, res) => {
  const inputPath = path.join(__dirname, "public", "uploads", req.params.name);
  const outputDir = path.join(__dirname, "public", "output");

  if (!fs.existsSync(inputPath)) {
    return res.status(404).send("File not found");
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `compressed-${req.params.name}`);

  try {
    if (req.params.ext === "jpg" || req.params.ext === "jpeg") {
      await sharp(inputPath).jpeg({ quality: 75 }).toFile(outputPath);
    } else if (req.params.ext === "png") {
      await sharp(inputPath).png({ quality: 80 }).toFile(outputPath);
    } else {
      return res.status(400).send("Unsupported image format");
    }

    res.download(outputPath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Compression failed");
      } else {
        fs.unlink(outputPath, (unlinkErr) => {
          if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
        });
      }
    });
  } catch (err) {
    console.error("Sharp error:", err);
    res.status(500).send("Something went wrong");
  }
});

app.use("/", urlRoute);
app.use("/user", userRoute);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
  });
};

startServer();
