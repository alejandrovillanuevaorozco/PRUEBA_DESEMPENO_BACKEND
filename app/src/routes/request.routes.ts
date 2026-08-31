import { Router } from 'express';
import { RequestController } from '../controllers/request.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();
const requestController = new RequestController();
/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Gestión y ciclo de vida de las solicitudes de abastecimiento
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Crea una nueva solicitud de abastecimiento
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clinic_id, medicine_id, warehouse_id, quantity]
 *             properties:
 *               clinic_id:
 *                 type: integer
 *               medicine_id:
 *                 type: integer
 *               warehouse_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *   get:
 *     summary: Obtiene todas las solicitudes activas
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: Historial de solicitudes
 */

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Actualiza el estado de una solicitud
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pendiente, Aprobada, Rechazada, Eliminada]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */

// Protección global de la ruta
router.use(verifyToken);
router.use(checkRole(['Administrador', 'Gestor de Solicitudes']));

router.post('/', requestController.create);
router.patch('/:id/status', requestController.updateStatus);
router.get('/', requestController.getAll);
router.get('/clinic/:clinicId', requestController.getByClinic);

export default router;