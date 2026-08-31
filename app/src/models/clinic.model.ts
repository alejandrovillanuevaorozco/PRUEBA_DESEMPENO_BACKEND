import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Clinic extends Model {
  public id!: number;
  public name!: string;
  public nit!: string;
  public manager!: string; // Responsable
  public status!: string;
}

Clinic.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  nit: { type: DataTypes.STRING, allowNull: false, unique: true },
  manager: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Activa' } // 'Activa' o 'Eliminada'
}, { sequelize, tableName: 'clinics', timestamps: true });