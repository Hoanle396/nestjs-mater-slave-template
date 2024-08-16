import { HttpStatus } from '@nestjs/common';

/**
 * Custom exception
 * @param statusCode HttpStatusCode or number
 * @param message message of exception
 * @param code code of CustomCodeEnum
 * @param explains explain of exception
 * @returns CustomException
 * 
 * @example
 * throw new CustomException(
      HttpStatusCode.BadRequest,
      'Email already exist',
      CustomCodeEnum.EMAIL_TAKEN,
      ['Email already exist', 'Username already exist'],
    );
 */
export class CustomException {
  public response: ICustomResponse;

  constructor(
    statusCode: number | HttpStatus,
    message: string,
    explains?: Record<string, any>,
  ) {
    this.response = {
      status: statusCode,
      message,
      explains,
    };
  }

  getResponse() {
    return this.response;
  }
}

export interface ICustomResponse {
  message: string;
  explains: Record<string, any>;
  status: number;
}
