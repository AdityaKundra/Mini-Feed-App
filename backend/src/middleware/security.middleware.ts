import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const createRateLimit = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests',
        details: message
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const apiLimiter = createRateLimit(
  15 * 60 * 1000,
  100,
  'Too many API requests from this IP, please try again later.'
);

export const authLimiter = createRateLimit(
  15 * 60 * 1000,
  5,
  'Too many authentication attempts, please try again later.'
);

export const uploadLimiter = createRateLimit(
  60 * 60 * 1000,
  10,
  'Upload limit exceeded. Please try again later.'
);

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
});


export const sanitizeInput = (req: any, res: any, next: any) => {

  const sanitize = (obj: any): any => {
    if (typeof obj === 'string') {

      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (Array.isArray(obj)) {
      return obj.map(sanitize);
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitize(obj[key]);
        }
      }
      return sanitized;
    }
    return obj;
  };

  // Sanitize request body and query. Avoid reassigning `req.query`
  // because in some environments it is a getter-only property.
  if (req.body) {
    if (req.body && typeof req.body === 'object') {
      const sanitizedBody = sanitize(req.body);
      for (const k in sanitizedBody) {
        if (Object.prototype.hasOwnProperty.call(sanitizedBody, k)) {
          req.body[k] = sanitizedBody[k];
        }
      }
    } else {
      req.body = sanitize(req.body);
    }
  }

  if (req.query && typeof req.query === 'object') {
    const sanitizedQuery = sanitize(req.query);
    for (const k in sanitizedQuery) {
      if (Object.prototype.hasOwnProperty.call(sanitizedQuery, k)) {
        (req.query as any)[k] = sanitizedQuery[k];
      }
    }
  }

  next();
};