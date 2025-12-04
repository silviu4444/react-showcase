export const EMAIL_CHECKER_REGEXP = "[a-z0-9._-]+@[a-z]+.[a-z]{2,3}";

export const PASSWORD_MIN_LENGTH = 8;

export const REFRESH_TOKEN_EXPIRATION = 5 * 60 * 1000;
export const REFRESH_TOKEN_REFRESH_INTERVAL =
  REFRESH_TOKEN_EXPIRATION - 30 * 1000;
