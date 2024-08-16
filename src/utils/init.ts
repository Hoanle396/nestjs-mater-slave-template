import { validateAllConfigs } from '@/config';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

export function validateEnvironmentVariables() {
  validateAllConfigs().catch(error => {
    Logger.error(error);
    Logger.warn('Environment validation failed');
    process.exit(1);
  });
}

const rateLimiter = new RateLimiterMemory({
  points: 150, // 150 requests per 10 minutes
  duration: 10 * 60,
});

export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await rateLimiter.consume(req.ip, 1);
    next();
  } catch {
    throw new HttpException(
      'Too many requests, please try again later.',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
};
