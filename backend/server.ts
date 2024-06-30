import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import clientRouter from "./src/routers/clientRouter";
import options from "./src/utils/cors";
import productRouter from "./src/routers/productRouter";
dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.use(cors(options));
server.use(morgan("dev"));
server.use(express.json());

server.use("/clients", clientRouter);
server.use("/products", productRouter);

server.listen(port, () => console.log(`Server is running on port ${port}`));
