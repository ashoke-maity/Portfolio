const multer = require("multer");
const bucket = require("../configs/firebase");

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

exports.uploadImage = [
  upload.single("image"), // field name should match your form input
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = Date.now() + "-" + req.file.originalname;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    });

    stream.on("finish", async () => {
      // Make the file publicly accessible (optional)
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      res.status(200).json({ imageUrl: publicUrl });
    });

    stream.end(req.file.buffer);
  },
];
