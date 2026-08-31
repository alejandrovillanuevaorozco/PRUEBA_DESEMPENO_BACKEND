import { User } from './user.model';
import { Audit } from './audit.model';




// Un usuario tiene muchos registros de auditoría
User.hasMany(Audit, { foreignKey: 'userId' });
Audit.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  Audit,
};