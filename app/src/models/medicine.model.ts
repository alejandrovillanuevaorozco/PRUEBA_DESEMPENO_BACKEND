import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Medicine extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public stock!: number;
  public status!: string;
}

Medicine.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: 'Activo' } // 'Activo' o 'Eliminado'
}, { sequelize, tableName: 'medicines', timestamps: true });