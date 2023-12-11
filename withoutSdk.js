const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

// Enable upload folder to be used as a static folder
app.use(express.static("upload"));
app.use(cors());

// Custom storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "upload/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    // Reject the file due to invalid file type
    cb(new Error("Only image files are allowed!"), false);
  } else {
    // Accept the file
    cb(null, true);
  }
};

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    message: "The Endpoint is working",
  });
});

app.post(
  "/upload",
  multer({
    fileFilter: fileFilter,
    limits: {
      // maximum file size of 5 MB
      fileSize: 5 * 1024 * 1024, // 5MB
    },
    storage: storage,
  }).single("file"),
  (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const imageUrl = path.join(__dirname, file.path);

    res.status(200).json({
      message: "File Uploaded",
      url: imageUrl,
    });
  }
);

app.use((err, req, res, next) => {
  // Handle Multer errors
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
