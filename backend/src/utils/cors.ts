import dotenv from "dotenv";
import type cors from "cors";

dotenv.config();
const allowedOrigins = [process.env.API_URL_DEV!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
