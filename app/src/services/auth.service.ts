import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/associations';
import { RegisterDTO, LoginDTO } from '../dto/auth.dto';
import { AppError } from '../error/appError';

export class AuthService {
  async register(data: RegisterDTO) {
    const role = await Role.findOne({ where: { name: data.roleName } });
    if (!role) throw new AppError('El rol especificado no existe', 400);

    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) throw new AppError('El correo ya está en uso', 400);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role_id: role.id
    });

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async login(data: LoginDTO) {
    const user = await User.findOne({
      where: { email: data.email },
      include: [{ model: Role, as: 'role' }]
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const roleName = (user as any).role.name;
    const token = jwt.sign(
      { id: user.id, role: roleName }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '8h' }
    );

    return { 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: roleName } 
    };
  }
}