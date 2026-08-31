import bcrypt from 'bcrypt';
import { Role, User, Clinic, Warehouse, Medicine } from '../models/associations';
import { AppError } from '../error/appError';

export class SeederService {
  async loadData(jsonData: any) {
    if (!jsonData) throw new AppError('No hay datos para procesar', 400);

    try {
      if (jsonData.roles?.length) {
        await Role.bulkCreate(jsonData.roles, { ignoreDuplicates: true });
      }
      
      if (jsonData.users?.length) {
        const usersWithHashedPasswords = await Promise.all(
          jsonData.users.map(async (u: any) => ({
            ...u,
            password: await bcrypt.hash(u.password, 10)
          }))
        );
        await User.bulkCreate(usersWithHashedPasswords, { ignoreDuplicates: true });
      }

      if (jsonData.clinics?.length) {
        await Clinic.bulkCreate(jsonData.clinics, { ignoreDuplicates: true });
      }

      if (jsonData.warehouses?.length) {
        await Warehouse.bulkCreate(jsonData.warehouses, { ignoreDuplicates: true });
      }

      if (jsonData.medicines?.length) {
        await Medicine.bulkCreate(jsonData.medicines, { ignoreDuplicates: true });
      }
    } catch (error) {
      throw new AppError(`Error al poblar la base de datos: ${(error as Error).message}`, 500);
    }
  }
}