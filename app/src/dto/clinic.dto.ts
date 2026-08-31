export interface CreateClinicDTO {
  name: string;
  nit: string;
  manager: string;
}

export interface UpdateClinicDTO {
  name?: string;
  manager?: string;
  status?: string;
}