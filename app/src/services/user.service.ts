import { User, Role } from "../models/associations";
import { AppError } from "../error/appError";

/**
 * Servicio de Usuarios
 *
 * Responsabilidades:
 * - Consultar información de usuarios registrados.
 * Nota: La creación de usuarios se maneja en AuthService.
 */
class UserService {
  
    /**
     * Obtener todos los usuarios.
     */
    async findAll(): Promise<User[]> {
        return await User.findAll({
            attributes: { exclude: ['password'] }, // Buena práctica: no exponer contraseñas
            include: [{ model: Role, as: 'role' }]
        });
    }

    /**
     * Obtener un usuario específico por su ID.
     */
    async findById(id: number): Promise<User> {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Role, as: 'role' }]
        });

        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }

        return user;
    }
}

export default new UserService();