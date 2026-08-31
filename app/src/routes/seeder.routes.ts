import { Router } from 'express';
import { SeederController } from '../controllers/seeder.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();
const seederController = new SeederController();
/**
 * @swagger
 * tags:
 *   name: Seeders
 *   description: Carga masiva de datos iniciales
 */

/**
 * @swagger
 * /api/seeders/load:
 *   post:
 *     summary: Puebla la base de datos a partir de un archivo JSON
 *     tags: [Seeders]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Base de datos poblada exitosamente
 */

router.post('/load', upload.single('file'), seederController.load);

export default router;