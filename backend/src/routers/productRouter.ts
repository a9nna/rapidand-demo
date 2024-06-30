import express from "express";
import multer from "multer";
import { createProduct, getProducts } from "../controllers/productControllers";
import path from "path";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const unicReference = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    const filename = `${basename}-${unicReference}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 8000000 } });

productRouter.post("/", upload.single("image"), createProduct);
productRouter.get("/", getProducts);

export default productRouter;
