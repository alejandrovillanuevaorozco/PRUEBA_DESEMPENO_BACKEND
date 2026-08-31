import { User } from './user.model';
import { Role } from './role.model';
import { Clinic } from './clinic.model';
import { Warehouse } from './warehouse.model';
import { Medicine } from './medicine.model';
import { RequestModel } from './request.model';

// Auth
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// Relaciones de la Solicitud (Request)
Clinic.hasMany(RequestModel, { foreignKey: 'clinic_id', as: 'requests' });
RequestModel.belongsTo(Clinic, { foreignKey: 'clinic_id', as: 'clinic' });

Medicine.hasMany(RequestModel, { foreignKey: 'medicine_id', as: 'requests' });
RequestModel.belongsTo(Medicine, { foreignKey: 'medicine_id', as: 'medicine' });

Warehouse.hasMany(RequestModel, { foreignKey: 'warehouse_id', as: 'requests' });
RequestModel.belongsTo(Warehouse, { foreignKey: 'warehouse_id', as: 'warehouse' });

export { User, Role, Clinic, Warehouse, Medicine, RequestModel };