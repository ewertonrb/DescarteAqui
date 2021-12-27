import {Router} from 'express';
import LocaisController from './controllers/LocaisController';
import multer from 'multer';
import UsersController from './controllers/UsersController';

import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/locais', LocaisController.index);
routes.get('/locais/:id', LocaisController.show);

routes.delete('/locais/:id', LocaisController.deleteLocal);

routes.get('/users', UsersController.users);
routes.get('/users/:id', UsersController.user);
routes.put('/users/:id', UsersController.updateUser);
routes.delete('/users/:id', UsersController.deleteUser);


routes.post('/locais', upload.array('images'), LocaisController.create);
routes.put('/locais/:id', upload.array('images'), LocaisController.updateLocal);
routes.post('/users', UsersController.create);


export default routes;