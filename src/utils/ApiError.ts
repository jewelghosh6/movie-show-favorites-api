export class ApiError extends Error {
  public statusCode: number;
  public errors?: any;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, errors?: any) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain

    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
