import { Clinic } from "../models/associations";

class ClinicRepository {
  async create(data: any): Promise<Clinic> {
    return await Clinic.create(data);
  }

  // Solo devuelve las que no están eliminadas lógicamente
  async findAllActive(): Promise<Clinic[]> {
    return await Clinic.findAll({ where: { status: 'Activa' } });
  }

  async findById(id: number): Promise<Clinic | null> {
    return await Clinic.findByPk(id);
  }

  async findByNit(nit: string): Promise<Clinic | null> {
    return await Clinic.findOne({ where: { nit } });
  }

  async update(id: number, data: any): Promise<void> {
    await Clinic.update(data, { where: { id } });
  }

  // Soft Delete: Actualiza el estado en lugar de borrar el registro
  async softDelete(id: number): Promise<void> {
    await Clinic.update({ status: 'Eliminada' }, { where: { id } });
  }
}

export default new ClinicRepository();