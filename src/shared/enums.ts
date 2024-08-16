export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export enum SocialAuthEnum {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum BasicAuthEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum SwaggerOperationEnum {
  PUBLIC = `Public router`,
  SUPER_ADMIN = `Super admin's router`,
  ADMIN = `Admin's router`,
  USER = `User's router`,
  BLUE_PRINT = `Blue print's router`,
}

export enum AuthMethodEnum {
  OTP_CODE = 'otp_code',
}
