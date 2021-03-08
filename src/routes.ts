import { Router } from 'express';
import UploadController from '@controllers/UploadController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const routes = Router();

const uploadController = new UploadController();

const upload = multer(uploadConfig.multer);

routes.post('/upload', upload.single('file'), uploadController.update);

export default routes;
