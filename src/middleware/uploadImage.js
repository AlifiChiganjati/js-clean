import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (req, file, db) => {
    db(null, "uploads/");
  },
  filename: (req, file, cb) => {
    db(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (rq, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Format foto hanya boleh JPEG dan PNG"), false);
  }
};

const upload = multer({
  imageStorage: imageStorage,
  fileFilter: fileFilter,
}).single("profile_image");

export default upload;
