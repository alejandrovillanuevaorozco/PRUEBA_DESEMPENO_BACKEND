import { Request, Response, NextFunction } from 'express';
import requestService from '../services/request.service';

export class RequestController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request = await requestService.create(req.body);
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request = await requestService.updateStatus(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: request });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requests = await requestService.getAll();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      next(error);
    }
  }

  async getByClinic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requests = await requestService.getByClinic(Number(req.params.clinicId));
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      next(error);
    }
  }
}