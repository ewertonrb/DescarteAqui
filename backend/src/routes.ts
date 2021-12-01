import {Router} from 'express';
import LocaisController from './controllers/LocaisController';
import multer from 'multer';
import UsersController from './controllers/UsersController';

import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/locais', LocaisController.index);
routes.get('/locais/:id', LocaisController.show);

routes.get('/users', UsersController.users);

routes.post('/locais', upload.array('images'), LocaisController.create);
routes.post('/users', UsersController.create);


export default routes;