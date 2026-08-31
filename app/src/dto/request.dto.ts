export interface CreateRequestDTO {
  clinic_id: number;
  medicine_id: number;
  warehouse_id: number;
  quantity: number;
}

export interface UpdateRequestStatusDTO {
  status: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Eliminada';
}