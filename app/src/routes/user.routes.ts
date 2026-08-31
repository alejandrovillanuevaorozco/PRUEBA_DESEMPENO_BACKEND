import { Router } from 'express';
import userService from '../services/user.service';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios registrados
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', verifyToken, checkRole(['Administrador']), async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

export default router;