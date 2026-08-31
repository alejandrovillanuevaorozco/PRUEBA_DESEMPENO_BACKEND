import { User, Role } from "../models/associations";
import { IUserRepository } from "./interfaces/user.repository.interface";

/**
 * Repositorio de Usuarios
 * -----------------------
 * Implementa el patrón Repository para encapsular todas las operaciones
 * de persistencia relacionadas con la entidad User.
 */
class UserRepository implements IUserRepository {

    /**
     * Crea un nuevo usuario.
     */
    async create(data: any): Promise<User> {
        return await User.create(data);
    }

    /**
     * Obtiene todos los usuarios sin la contraseña y con su rol.
     */
    async findAll(): Promise<User[]> {
        return await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    as: 'role'
                }
            ]
        });
    }   
    
    /**
     * Busca un usuario por su correo electrónico (usado en el Login).
     */
    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    as: 'role'
                }
            ]
        });
    }
}

export default new UserRepository();