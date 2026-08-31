import { Request, Response, NextFunction } from 'express';
import { SeederService } from '../services/seeder.service';
import { AppError } from '../error/appError';

const seederService = new SeederService();

export class SeederController {
  async load(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw new AppError('Por favor, incluye un archivo en la propiedad "file"', 400);
      }

      const fileContent = req.file.buffer.toString('utf-8');
      const jsonData = JSON.parse(fileContent);

      await seederService.loadData(jsonData);

      res.status(200).json({ 
        success: true, 
        message: 'Base de datos poblada exitosamente desde el archivo JSON' 
      });
    } catch (error) {
      if (error instanceof SyntaxError) {
        next(new AppError('El archivo provisto no tiene un formato JSON válido', 400));
      } else {
        next(error);
      }
    }
  }
}