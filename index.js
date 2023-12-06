require("dotenv").config();

const express = require("express");
const ImageKit = require("imagekit");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.get("/", (req, res) => {
  res.json({
    message: "The Endpoint is working",
  });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

app.post("/upload", multer().single("file"), async (req, res) => {
  try {
    const file = req.file;

    // File type check
    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Invalid file type. Only JPEG and PNG files are allowed.",
      });
    }

    // File size check
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      return res.status(400).json({
        message: "File size exceeds the maximum limit of 5MB.",
      });
    }

    const result = await imageKit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    res.json({
      message: "File Uploaded",
      url: result.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
