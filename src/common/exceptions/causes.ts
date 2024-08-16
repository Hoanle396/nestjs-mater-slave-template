import { HttpException, HttpStatus } from '@nestjs/common';

function createHttpException(
  { name = '', message = '' } = {},
  status: HttpStatus,
) {
  return new HttpException(message || name, status);
}

export const Causes = {
  CONTINUE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} continue`, message },
      HttpStatus.CONTINUE,
    ),

  SWITCHING_PROTOCOLS: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} switching protocols`, message },
      HttpStatus.SWITCHING_PROTOCOLS,
    ),

  PROCESSING: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} processing`, message },
      HttpStatus.PROCESSING,
    ),

  EARLYHINTS: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} earlyhints`, message },
      HttpStatus.EARLYHINTS,
    ),

  OK: (name: string, message?: string) =>
    createHttpException({ name: `${name} ok`, message }, HttpStatus.OK),

  CREATED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} created`, message },
      HttpStatus.CREATED,
    ),

  ACCEPTED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} accepted`, message },
      HttpStatus.ACCEPTED,
    ),

  NON_AUTHORITATIVE_INFORMATION: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} non authoritative information`, message },
      HttpStatus.NON_AUTHORITATIVE_INFORMATION,
    ),

  NO_CONTENT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} no content`, message },
      HttpStatus.NO_CONTENT,
    ),

  RESET_CONTENT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} reset content`, message },
      HttpStatus.RESET_CONTENT,
    ),

  PARTIAL_CONTENT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} partial content`, message },
      HttpStatus.PARTIAL_CONTENT,
    ),

  AMBIGUOUS: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} ambiguous`, message },
      HttpStatus.AMBIGUOUS,
    ),

  MOVED_PERMANENTLY: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} moved permanently`, message },
      HttpStatus.MOVED_PERMANENTLY,
    ),

  FOUND: (name: string, message?: string) =>
    createHttpException({ name: `${name} found`, message }, HttpStatus.FOUND),

  SEE_OTHER: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} see other`, message },
      HttpStatus.SEE_OTHER,
    ),

  NOT_MODIFIED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} not modified`, message },
      HttpStatus.NOT_MODIFIED,
    ),

  TEMPORARY_REDIRECT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} temporary redirect`, message },
      HttpStatus.TEMPORARY_REDIRECT,
    ),

  PERMANENT_REDIRECT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} permanent redirect`, message },
      HttpStatus.PERMANENT_REDIRECT,
    ),

  BAD_REQUEST: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} bad request`, message },
      HttpStatus.BAD_REQUEST,
    ),

  UNAUTHORIZED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} unauthorized`, message },
      HttpStatus.UNAUTHORIZED,
    ),

  PAYMENT_REQUIRED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} payment required`, message },
      HttpStatus.PAYMENT_REQUIRED,
    ),

  FORBIDDEN: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} forbidden`, message },
      HttpStatus.FORBIDDEN,
    ),

  NOT_FOUND: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} not found`, message },
      HttpStatus.NOT_FOUND,
    ),

  METHOD_NOT_ALLOWED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} method not allowed`, message },
      HttpStatus.METHOD_NOT_ALLOWED,
    ),

  NOT_ACCEPTABLE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} not acceptable`, message },
      HttpStatus.NOT_ACCEPTABLE,
    ),

  PROXY_AUTHENTICATION_REQUIRED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} proxy authentication required`, message },
      HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
    ),

  REQUEST_TIMEOUT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} request timeout`, message },
      HttpStatus.REQUEST_TIMEOUT,
    ),

  CONFLICT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} conflict`, message },
      HttpStatus.CONFLICT,
    ),

  GONE: (name: string, message?: string) =>
    createHttpException({ name: `${name} gone`, message }, HttpStatus.GONE),

  LENGTH_REQUIRED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} length required`, message },
      HttpStatus.LENGTH_REQUIRED,
    ),

  PRECONDITION_FAILED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} precondition failed`, message },
      HttpStatus.PRECONDITION_FAILED,
    ),

  PAYLOAD_TOO_LARGE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} payload too large`, message },
      HttpStatus.PAYLOAD_TOO_LARGE,
    ),

  URI_TOO_LONG: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} uri too long`, message },
      HttpStatus.URI_TOO_LONG,
    ),

  UNSUPPORTED_MEDIA_TYPE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} unsupported media type`, message },
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    ),

  REQUESTED_RANGE_NOT_SATISFIABLE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} requested range not satisfiable`, message },
      HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
    ),

  EXPECTATION_FAILED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} expectation failed`, message },
      HttpStatus.EXPECTATION_FAILED,
    ),

  I_AM_A_TEAPOT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} i am a teapot`, message },
      HttpStatus.I_AM_A_TEAPOT,
    ),

  MISDIRECTED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} misdirected`, message },
      HttpStatus.MISDIRECTED,
    ),

  UNPROCESSABLE_ENTITY: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} unprocessable entity`, message },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),

  FAILED_DEPENDENCY: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} failed dependency`, message },
      HttpStatus.FAILED_DEPENDENCY,
    ),

  PRECONDITION_REQUIRED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} precondition required`, message },
      HttpStatus.PRECONDITION_REQUIRED,
    ),

  TOO_MANY_REQUESTS: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} too many requests`, message },
      HttpStatus.TOO_MANY_REQUESTS,
    ),

  INTERNAL_SERVER_ERROR: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} internal server error`, message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    ),

  NOT_IMPLEMENTED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} not implemented`, message },
      HttpStatus.NOT_IMPLEMENTED,
    ),

  BAD_GATEWAY: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} bad gateway`, message },
      HttpStatus.BAD_GATEWAY,
    ),

  SERVICE_UNAVAILABLE: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} service unavailable`, message },
      HttpStatus.SERVICE_UNAVAILABLE,
    ),

  GATEWAY_TIMEOUT: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} gateway timeout`, message },
      HttpStatus.GATEWAY_TIMEOUT,
    ),

  HTTP_VERSION_NOT_SUPPORTED: (name: string, message?: string) =>
    createHttpException(
      { name: `${name} http version not supported`, message },
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    ),
};
