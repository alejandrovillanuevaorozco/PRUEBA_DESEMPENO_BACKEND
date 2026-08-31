import { Request, Response, NextFunction } from 'express';
import clinicService from '../services/clinic.service';

export class ClinicController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clinic = await clinicService.create(req.body);
      res.status(201).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clinics = await clinicService.getAll();
      res.status(200).json({ success: true, data: clinics });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clinic = await clinicService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clinic = await clinicService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await clinicService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Clínica eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}