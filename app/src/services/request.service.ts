import requestRepository from '../repositories/request.repository';
import { Clinic, Medicine, Warehouse } from '../models/associations';
import { AppError } from '../error/appError';
import { CreateRequestDTO, UpdateRequestStatusDTO } from '../dto/request.dto';

class RequestService {
  async create(data: CreateRequestDTO) {
    // Validación 1: Cantidad mayor a cero
    if (data.quantity <= 0) {
      throw new AppError('La cantidad solicitada debe ser mayor a cero', 400);
    }

    // Validación 2: Existencia de entidades
    const clinic = await Clinic.findByPk(data.clinic_id);
    if (!clinic) throw new AppError('La clínica solicitante no existe', 404);

    const warehouse = await Warehouse.findByPk(data.warehouse_id);
    if (!warehouse) throw new AppError('El almacén asignado no existe', 404);

    const medicine = await Medicine.findByPk(data.medicine_id);
    if (!medicine) throw new AppError('El medicamento solicitado no existe', 404);

    // Validación 3: Inventario suficiente
    if (medicine.stock < data.quantity) {
      throw new AppError('El almacén no tiene inventario suficiente de este medicamento', 400);
    }

    // Se crea la solicitud con estado inicial por defecto
    return await requestRepository.create({ ...data, status: 'Pendiente' });
  }

  async updateStatus(id: number, data: UpdateRequestStatusDTO) {
    // Validación de estados permitidos
    const validStatuses = ['Pendiente', 'Aprobada', 'Rechazada', 'Eliminada'];
    if (!validStatuses.includes(data.status)) {
      throw new AppError(`Estado no permitido. Opciones válidas: ${validStatuses.join(', ')}`, 400);
    }

    const request = await requestRepository.findById(id);
    if (!request) throw new AppError('Solicitud no encontrada', 404);

    await requestRepository.updateStatus(id, data.status);
    return await requestRepository.findById(id);
  }

  async getAll() {
    return await requestRepository.findAllActive();
  }

  async getByClinic(clinicId: number) {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) throw new AppError('La clínica no existe', 404);
    
    return await requestRepository.findByClinicId(clinicId);
  }
}

export default new RequestService();