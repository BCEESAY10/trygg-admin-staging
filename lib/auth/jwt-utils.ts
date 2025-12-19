/* eslint-disable prefer-destructuring */
interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

interface TokenInfo {
  isValid: boolean;
  isExpired: boolean;
  expiresAt: Date | null;
}

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    let payload = parts[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');

    while (payload.length % 4) {
      payload += '=';
    }

    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload) as JWTPayload;
  } catch {
    return null;
  }
};

export const getJWTExpiration = (token: string): number | null => {
  const payload = decodeJWT(token);

  if (!payload?.exp) {
    return null;
  }

  return payload.exp * 1000;
};

export const isJWTExpired = (token: string, bufferMinutes = 5): boolean => {
  try {
    const expirationTime = getJWTExpiration(token);

    if (!expirationTime) {
      return true;
    }

    const bufferTime = bufferMinutes * 60 * 1000;
    const now = Date.now();

    return now > expirationTime - bufferTime;
  } catch {
    return true;
  }
};

export const getJWTInfo = (token: string): TokenInfo => {
  try {
    const payload = decodeJWT(token);

    if (!payload) {
      return {
        isValid: false,
        isExpired: true,
        expiresAt: null,
      };
    }

    const expiresAt = payload.exp ? new Date(payload.exp * 1000) : null;
    const isExpired = payload.exp ? Date.now() > payload.exp * 1000 : false;

    return {
      isValid: true,
      isExpired,
      expiresAt,
    };
  } catch {
    return {
      isValid: false,
      isExpired: true,
      expiresAt: null,
    };
  }
};

export const getJWTTimeRemaining = (token: string): number | null => {
  const expirationTime = getJWTExpiration(token);

  if (!expirationTime) {
    return null;
  }

  const timeLeft = expirationTime - Date.now();

  if (timeLeft <= 0) {
    return 0;
  }

  return Math.floor(timeLeft / 1000 / 60);
};

export const isJWTExpiringSoon = (
  token: string,
  withinMinutes = 10
): boolean => {
  const timeRemaining = getJWTTimeRemaining(token);

  if (timeRemaining === null) {
    return true;
  }

  return timeRemaining <= withinMinutes;
};

export default {
  getExpiration: getJWTExpiration,
  isExpired: isJWTExpired,
  getInfo: getJWTInfo,
  getTimeRemaining: getJWTTimeRemaining,
  isExpiringSoon: isJWTExpiringSoon,
};
