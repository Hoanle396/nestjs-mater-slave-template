import { StellaConfig } from '@/config';
import { IResponse } from '@/shared/interfaces/response.interface';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const logger = new Logger('Response');

function processResponseData(data: any, statusCode?: number): any {
  return {
    meta: {
      code: data.statusCode || statusCode,
      message: data.message || 'Successful',
    },
    data: data.results || data,
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  constructor(private readonly configService: ConfigService<StellaConfig>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        map(
          data => (
            logger.debug(`API Response Status Code: ${statusCode}`),
            processResponseData(data, statusCode)
          ),
        ),
      );
  }
}
