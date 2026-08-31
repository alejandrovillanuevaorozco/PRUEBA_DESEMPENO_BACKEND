import clinicRepository from '../repositories/clinic.repository';
import { AppError } from '../error/appError';
import { CreateClinicDTO, UpdateClinicDTO } from '../dto/clinic.dto';

class ClinicService {
  async create(data: CreateClinicDTO) {
    const existingClinic = await clinicRepository.findByNit(data.nit);
    if (existingClinic) {
      throw new AppError('Ya existe una clínica registrada con este NIT', 400);
    }
    return await clinicRepository.create(data);
  }

  async getAll() {
    return await clinicRepository.findAllActive();
  }

  async getById(id: number) {
    const clinic = await clinicRepository.findById(id);
    if (!clinic) {
      throw new AppError('Clínica no encontrada', 404);
    }
    return clinic;
  }

  async update(id: number, data: UpdateClinicDTO) {
    await this.getById(id); // Validar que exista antes de actualizar
    await clinicRepository.update(id, data);
    return await clinicRepository.findById(id);
  }

  async delete(id: number) {
    await this.getById(id); // Validar que exista antes de eliminar
    await clinicRepository.softDelete(id);
  }
}

export default new ClinicService();