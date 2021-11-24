import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import OperationController from './app/controllers/OperationController';
import StoreController from './app/controllers/StoreController';

// Middlewares
import authMiddleware from './app/middlewares/Auth/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), OperationController.store);

routes.get('/operations', OperationController.index);
routes.get('/stores', StoreController.index);

export default routes;
