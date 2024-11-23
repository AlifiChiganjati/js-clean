import multer from "multer";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";

const __dirname = new URL("../../", import.meta.url).pathname;

const dir = path.join(__dirname, "public");
const directoryPath = path.join(dir, "uploads");

const ensureDirectoryExists = async () => {
  try {
    if (!fs.existsSync(dir)) {
      await fsPromises.mkdir(dir, { recursive: true });
    }

    if (!fs.existsSync(directoryPath)) {
      await fsPromises.mkdir(directoryPath, { recursive: true });
    }
  } catch (error) {
    console.error("Error creating directories: ", error);
    throw error;
  }
};

ensureDirectoryExists().catch((err) => {
  process.exit(1);
});

const upload = multer({
  limits: { fileSize: 800000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directoryPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["jpg", "jpeg", "png"];
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Format Image tidak sesuai"), false);
    }
  },
});

export default upload;
