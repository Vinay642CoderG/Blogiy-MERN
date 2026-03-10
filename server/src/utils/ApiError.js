class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message);

    this.statusCode = statusCode >= 400 ? statusCode : 500;
    this.success = false;
    this.message = message || "Internal Server Error";
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
