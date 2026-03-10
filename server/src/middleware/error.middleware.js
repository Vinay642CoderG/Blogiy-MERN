import env from "../config/env.js";
import { getReasonPhrase } from "http-status-codes";

/* 404 handler */
export const notFoundHandler = (req, res, next) => {
  const err = new Error(`Route not found.`);
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
};

/* global error handler */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    ...(err.isOperational
      ? { message: err.message }
      : { message: getReasonPhrase(statusCode) }),
    ...(err.errors && { errors: err.errors }),
    ...(env.DEBUG && statusCode >= 500 && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};
