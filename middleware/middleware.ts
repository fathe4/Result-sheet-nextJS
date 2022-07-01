import multer from "multer";
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) =>
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname),
  }),
});
export default upload;
