import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { DatabaseError, ValidationError } from 'sequelize';
import { createErrorResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/ApiError';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data',
      errors: err.errors.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  // Custom API errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  // Sequelize database errors (e.g., unique constraint, foreign key, not null)
  if (err instanceof DatabaseError) {
    const code = (err.parent as any)?.code;
    if (code === '23503') {
      // Foreign key violation
      res.status(400).json({
        success: false,
        message:
          'Invalid reference: Related entity does not exist: ' +
          (err.original as any).detail,
      });
      return;
    }
    if (code === '23502') {
      // Not null violation
      res.status(400).json({
        success: false,
        message: 'Missing required field in request.',
      });
      return;
    }
    if (code === '23514') {
      // Check constraint violation
      res.status(400).json({
        success: false,
        message:
          'Validation failed: One or more fields violate database constraints. ' +
          (err.original as any).constraint,
      });
      return;
    }

    // Other database errors
    res.status(500).json({
      success: false,
      message: 'An unexpected database error occurred.',
    });
    return;
  }

  // Sequelize validation errors
  if (err instanceof ValidationError) {
    const code = (err as any).parent?.code;
    if (code === '23505') {
      // Unique violation
      res.status(409).json({
        success: false,
        message: `Duplicate entry: This value already exists: ${(err as any).parent?.detail}`,
        // + (err as any).parent?.detail,
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: 'Validation error in request data.',
      errors: err.errors.map((e) => e.message),
    });
    return;
  }

  // Catch-all for other errors
  if (err instanceof Error) {
    res
      .status(500)
      .json(createErrorResponse('Internal Server Error', err.message, 500));
    return;
  }

};
