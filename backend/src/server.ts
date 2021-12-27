import  path from 'path';

import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import {createConnection}from 'typeorm'
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';


const app = express();
createConnection();

app.use(cors());
app.use(express.json());
app.use(routes);

const localUpload = express.static(path.join(__dirname, '..', 'uploads'));
app.use('/uploads', localUpload);
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
