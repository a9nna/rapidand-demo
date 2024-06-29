import express from 'express';
import { createClient } from '../controllers/clientControllers';

const clientRouter = express.Router();

clientRouter.post('/', createClient);

export default clientRouter;
