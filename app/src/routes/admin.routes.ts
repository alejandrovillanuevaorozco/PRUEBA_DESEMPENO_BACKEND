import { Router } from 'express';
import { ClinicController } from '../controllers/clinic.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();
const clinicController = new ClinicController();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestión completa de Clínicas, Almacenes y Medicamentos
 */

/**
 * @swagger
 * /api/admin/clinics:
 *   post:
 *     summary: Registra una nueva clínica
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, nit, manager]
 *             properties:
 *               name:
 *                 type: string
 *               nit:
 *                 type: string
 *               manager:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clínica registrada exitosamente
 *   get:
 *     summary: Obtiene la lista de clínicas activas
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de clínicas
 */

/**
 * @swagger
 * /api/admin/clinics/{id}:
 *   patch:
 *     summary: Actualiza los datos de una clínica
 *     tags: [Admin]
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
 *             properties:
 *               name:
 *                 type: string
 *               manager:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clínica actualizada
 *   delete:
 *     summary: Elimina lógicamente una clínica
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clínica eliminada (Soft delete)
 */

// Todos los endpoints de este router requerirán token y rol de Administrador
router.use(verifyToken);
router.use(checkRole(['Administrador']));

// --- CRUD CLÍNICAS ---
router.post('/clinics', clinicController.create);
router.get('/clinics', clinicController.getAll);
router.get('/clinics/:id', clinicController.getById);
router.patch('/clinics/:id', clinicController.update);
router.delete('/clinics/:id', clinicController.delete);

// Aquí agregarás las rutas de Almacenes, Medicamentos y Solicitudes...
// router.post('/warehouses', warehouseController.create);
// etc...

export default router;