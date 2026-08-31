import { RequestModel, Clinic, Medicine, Warehouse } from "../models/associations";

class RequestRepository {
  async create(data: any): Promise<RequestModel> {
    return await RequestModel.create(data);
  }

  async findById(id: number): Promise<RequestModel | null> {
    return await RequestModel.findByPk(id);
  }

  // Obtiene todas las solicitudes excluyendo las que tienen borrado lógico ('Eliminada')
  async findAllActive(): Promise<RequestModel[]> {
    return await RequestModel.findAll({
      where: { status: ['Pendiente', 'Aprobada', 'Rechazada'] },
      include: [
        { model: Clinic, as: 'clinic', attributes: ['name', 'nit'] },
        { model: Medicine, as: 'medicine', attributes: ['name'] },
        { model: Warehouse, as: 'warehouse', attributes: ['name'] }
      ]
    });
  }

  // Historial filtrado por una clínica específica
  async findByClinicId(clinic_id: number): Promise<RequestModel[]> {
    return await RequestModel.findAll({
      where: { clinic_id },
      include: [
        { model: Medicine, as: 'medicine', attributes: ['name'] },
        { model: Warehouse, as: 'warehouse', attributes: ['name'] }
      ]
    });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await RequestModel.update({ status }, { where: { id } });
  }
}

export default new RequestRepository();