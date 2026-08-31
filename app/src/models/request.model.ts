import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class RequestModel extends Model {
  public id!: number;
  public clinic_id!: number;
  public medicine_id!: number;
  public warehouse_id!: number;
  public quantity!: number;
  public status!: string;
}

RequestModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clinic_id: { type: DataTypes.INTEGER, allowNull: false },
  medicine_id: { type: DataTypes.INTEGER, allowNull: false },
  warehouse_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pendiente' } // Pendiente, Aprobada, Rechazada, Eliminada
}, { sequelize, tableName: 'requests', timestamps: true });