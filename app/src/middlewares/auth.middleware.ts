import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../error/appError';

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return next(new AppError('Acceso denegado: Token no proporcionado', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Token inválido o expirado', 401));
  }
};

export const checkRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('Acceso denegado: Permisos insuficientes', 403));
    }
    next();
  };
};