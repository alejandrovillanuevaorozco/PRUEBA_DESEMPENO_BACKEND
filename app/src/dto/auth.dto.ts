export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  roleName: 'Administrador' | 'Gestor de Solicitudes';
}

export interface LoginDTO {
  email: string;
  password: string;
}