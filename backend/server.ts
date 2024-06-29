import express from 'express';
import morgan from 'morgan';
import clientRouter from './src/routers/clientRouter';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.use(morgan('dev'));
server.use(express.json());

server.use('/clients', clientRouter);

server.listen(port, () => console.log(`Server is running on port ${port}`));
