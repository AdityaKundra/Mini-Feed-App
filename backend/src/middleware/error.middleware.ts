import { Request, Response, NextFunction } from 'express';

// Global error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: 'File size exceeds the maximum allowed limit of 50MB.',
        details: 'Please select smaller files or compress your images.'
      }
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'Unexpected file format received.',
        details: 'Please ensure you are uploading valid image files.'
      }
    });
  }

  // Handle payload too large errors
  if (err.type === 'entity.too.large' || err.message?.includes('Payload too large')) {
    return res.status(413).json({
      success: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request data is too large to process.',
        details: 'Try uploading fewer images or smaller files. Maximum payload size is 50MB.'
      }
    });
  }

  // Handle MongoDB/Mongoose errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error: any) => error.message);
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid data provided.',
        details: errors.join(', ')
      }
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'Invalid resource identifier provided.',
        details: 'Please check the ID format and try again.'
      }
    });
  }

  // Handle JWT authentication errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Authentication token is invalid.',
        details: 'Please log in again to continue.'
      }
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_EXPIRED',
        message: 'Your session has expired.',
        details: 'Please log in again to continue.'
      }
    });
  }

  // Handle custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code || 'APPLICATION_ERROR',
        message: err.message,
        details: err.details || null
      }
    });
  }

  // Default error response for unhandled errors
  const statusCode = err.statusCode || err.status || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: statusCode >= 500 ? 'An unexpected error occurred.' : err.message || 'Request failed.',
      details: isDevelopment ? err.stack : null,
      ...(isDevelopment && { originalError: err.message })
    }
  });
};

// 404 Not Found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
      details: `No route matches ${req.method} ${req.originalUrl}`
    }
  });
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : res.statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';
    console.log(`[${new Date().toISOString()}] ${statusColor}${req.method} ${req.originalUrl} ${res.statusCode}\x1b[0m - ${duration}ms`);
  });

  next();
};

// CORS error handling middleware
export const corsErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CORS_ERROR',
        message: 'Cross-origin request blocked.',
        details: 'This request violates the same-origin policy.'
      }
    });
  }
  next(err);
};