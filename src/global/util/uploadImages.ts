import multer from "multer";
import Exception from "../../exceptions/Exception";

const FILE_TYPE_MAP: { [index: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file: Express.Multer.File, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError: Error | null = null;
    if (isValid) {
      uploadError = null;
    } else {
      uploadError = new Exception("invalid image type");
    }
    cb(uploadError, "src/public/uploads");
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const fileName = file.originalname.split(".").slice(0, -1).join("");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

export const uploadOptions = multer({ storage: storage });
