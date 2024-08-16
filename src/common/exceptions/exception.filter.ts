import type {
  ArgumentsHost,
  ExceptionFilter as ExceptionFilterBase,
} from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { CustomException } from './custom_exception';

const logger = new Logger('ExceptionFilter');

function processMessage(exception: any): string {
  let message: any =
    exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';
  if (typeof message == 'object') {
    message = message.message ? message.message : message.error || message;
  }
  return message;
}

@Catch()
export class ExceptionFilter implements ExceptionFilterBase {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = `Body: ${JSON.stringify(request.body)}`;
    const query = `Query: ${JSON.stringify(request.query)}`;
    const params = `Params: ${JSON.stringify(request.params)}`;

    const customException = exception?.response;

    logger.error(body);
    logger.error(query);
    logger.error(params);
    logger.error(
      customException
        ? {
            status: customException.status,
            message: customException.message,
            explains: customException.explains,
          }
        : exception,
    ); // CustomException or Default

    const message = processMessage(exception);

    if (exception) {
      return response.status(customException?.status || status).json({
        meta: {
          code: customException?.status || status,
          message: customException?.message || message,
        },
        data:
          exception instanceof CustomException
            ? customException
            : {
                status: status,
                message: undefined,
                explains: message,
              },
      });
    }
  }
}
