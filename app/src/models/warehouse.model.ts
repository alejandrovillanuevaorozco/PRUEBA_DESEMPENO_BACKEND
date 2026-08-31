import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public status!: string;
}

Warehouse.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Activo' } // 'Activo' o 'Eliminado'
}, { sequelize, tableName: 'warehouses', timestamps: true });