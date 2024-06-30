import express from "express";
import { createClient, getClients } from "../controllers/clientControllers";

const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getClients);

export default clientRouter;
