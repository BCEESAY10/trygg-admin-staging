import axios from 'axios';
import Cookies from 'js-cookie';

import { STORAGE_KEYS } from 'constants/storage-keys';

import { showToast } from '../../utils/toast';
import { queryClient } from '../query-client';

import JWT from './jwt-utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

interface TokenData {
  accessToken: string;
  expiresAt: number;
}

interface TokenResponse {
  accessToken?: string;
}

type LogoutCallback = () => void | Promise<void>;
type SessionWarningCallback = (timeRemaining: number) => void | Promise<void>;

class TokenManager {
  private expiryCheckTimer: number | null = null;
  private isLoggingOut = false;
  private isLoggedOut = false;
  private router: any = null;
  private logoutCallbacks: Set<LogoutCallback> = new Set();
  private sessionWarningCallbacks: Set<SessionWarningCallback> = new Set();
  private visibilityChangeHandler: () => void;
  private focusHandler: () => void;
  private blurHandler: () => void;
  private hasShownWarning = false;
  private warningTimeouts: number[] = [];

  private readonly WARNING_THRESHOLDS = [30, 15, 5, 1];

  constructor() {
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
    this.focusHandler = this.handleFocus.bind(this);
    this.blurHandler = this.handleBlur.bind(this);

    this.setupEventListeners();

    setTimeout(() => {
      this.checkTokenExpiry();
    }, 1000);
  }

  initializeRouter(router: any) {
    this.router = router;
  }

  private setupEventListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener(
        'visibilitychange',
        this.visibilityChangeHandler
      );
      window.addEventListener('focus', this.focusHandler);
      window.addEventListener('blur', this.blurHandler);
    }
  }

  private removeEventListeners() {
    if (typeof document !== 'undefined') {
      document.removeEventListener(
        'visibilitychange',
        this.visibilityChangeHandler
      );
      window.removeEventListener('focus', this.focusHandler);
      window.removeEventListener('blur', this.blurHandler);
    }
  }

  private handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.checkTokenExpiry();
    } else if (document.visibilityState === 'hidden') {
      this.clearExpiryTimer();
    }
  }

  private handleFocus() {
    this.checkTokenExpiry();
  }

  private handleBlur() {
    this.clearExpiryTimer();
  }

  onLogout(callback: LogoutCallback) {
    this.logoutCallbacks.add(callback);
    return () => this.logoutCallbacks.delete(callback);
  }

  onSessionWarning(callback: SessionWarningCallback) {
    this.sessionWarningCallbacks.add(callback);
    return () => this.sessionWarningCallbacks.delete(callback);
  }

  private async notifyLogoutCallbacks() {
    const promises = Array.from(this.logoutCallbacks).map(callback => {
      try {
        return Promise.resolve(callback());
      } catch (error) {
        return Promise.resolve();
      }
    });
    await Promise.allSettled(promises);
  }

  private async notifySessionWarningCallbacks(timeRemaining: number) {
    const promises = Array.from(this.sessionWarningCallbacks).map(callback => {
      try {
        return Promise.resolve(callback(timeRemaining));
      } catch (error) {
        return Promise.resolve();
      }
    });
    await Promise.allSettled(promises);
  }

  private getTokenData(): TokenData | null {
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      const rawCookie = Cookies.get(STORAGE_KEYS.AUTH_COOKIE);
      const expiresAtStr = Cookies.get(STORAGE_KEYS.TOKEN_EXPIRES_AT);

      if (!rawCookie || !expiresAtStr) {
        return null;
      }

      const parsed = JSON.parse(rawCookie);
      const accessToken = parsed.token;

      if (!accessToken) {
        return null;
      }

      return {
        accessToken,
        expiresAt: parseInt(expiresAtStr, 10),
      };
    } catch (error) {
      return null;
    }
  }

  private saveTokenData(data: TokenData) {
    try {
      const expirationDays = Math.max(
        (data.expiresAt - Date.now()) / 1000 / 60 / 60 / 24,
        1 / 24
      );

      const cookieOptions = {
        secure: true,
        sameSite: 'strict' as const,
      };

      Cookies.set(STORAGE_KEYS.AUTH_COOKIE, data.accessToken, cookieOptions);
      Cookies.set(
        STORAGE_KEYS.TOKEN_EXPIRES_AT,
        data.expiresAt.toString(),
        cookieOptions
      );
    } catch (error) {
      console.error('Failed to save token data');
      throw error;
    }
  }

  private clearTokenData() {
    try {
      Cookies.remove(STORAGE_KEYS.AUTH_COOKIE, { path: '/' });
      Cookies.remove(STORAGE_KEYS.TOKEN_EXPIRES_AT, { path: '/' });
      console.log('Tokens cleared from cookies');
    } catch (error) {
      console.error('Failed to clear token data');
    }
  }

  private clearExpiryTimer() {
    if (this.expiryCheckTimer) {
      window.clearTimeout(this.expiryCheckTimer);
      this.expiryCheckTimer = null;
    }

    this.warningTimeouts.forEach(timeout => window.clearTimeout(timeout));
    this.warningTimeouts = [];
  }

  private scheduleExpiryCheck(expiresAt: number) {
    this.clearExpiryTimer();

    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    const minutesUntilExpiry = Math.round(timeUntilExpiry / 1000 / 60);

    console.log(`Token expires in ${minutesUntilExpiry} minutes`);

    if (minutesUntilExpiry < 5) {
      return;
    }

    this.WARNING_THRESHOLDS.forEach(warningMinutes => {
      const warningTime = expiresAt - warningMinutes * 60 * 1000;
      const timeUntilWarning = warningTime - now;

      if (timeUntilWarning > 0 && minutesUntilExpiry > warningMinutes) {
        const timeout = window.setTimeout(() => {
          this.showSessionWarning(warningMinutes);
        }, timeUntilWarning);
        this.warningTimeouts.push(timeout);
      }
    });

    if (timeUntilExpiry > 60000) {
      this.expiryCheckTimer = window.setTimeout(() => {
        console.log('Token expired - logging out automatically');
        showToast(
          'warning',
          'Session Expired',
          'Your session has expired. Please sign in again.'
        );
        this.logout();
      }, timeUntilExpiry);
    }
  }

  private showSessionWarning(minutesRemaining: number) {
    console.log(`Session warning: ${minutesRemaining} minutes remaining`);

    let message = '';
    let type: 'warning' | 'error' = 'warning';

    if (minutesRemaining >= 15) {
      message = `Your session will expire in ${minutesRemaining} minutes. Please save your work.`;
    } else if (minutesRemaining >= 5) {
      message = `Your session will expire in ${minutesRemaining} minutes. Please save your work and prepare to sign in again.`;
    } else {
      message = `Your session will expire in ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}. Please save your work immediately!`;
      type = 'error';
    }

    showToast(type, 'Session Expiring Soon', message);
    this.notifySessionWarningCallbacks(minutesRemaining);
  }

  private getExpirationTime(tokenResponse: TokenResponse): number {
    const accessToken = tokenResponse.accessToken ?? '';

    if (accessToken) {
      try {
        const expiration = JWT.getExpiration(accessToken);
        if (expiration && expiration > Date.now()) {
          return expiration;
        }
      } catch (error) {
        console.warn('Failed to parse JWT expiration');
      }
    }

    return Date.now() + 2 * 60 * 60 * 1000;
  }

  checkTokenExpiry() {
    if (this.isLoggedOut || this.isLoggingOut) {
      return;
    }

    const tokenData = this.getTokenData();
    if (!tokenData) {
      console.log('No token found');
      return;
    }

    const now = Date.now();
    const timeUntilExpiry = tokenData.expiresAt - now;

    if (timeUntilExpiry <= 30000) {
      console.log('Token expired - logging out');
      this.logout();
    } else {
      this.scheduleExpiryCheck(tokenData.expiresAt);
    }
  }

  async getCurrentToken(): Promise<string | null> {
    if (this.isLoggedOut) {
      return null;
    }

    const tokenData = this.getTokenData();
    if (!tokenData) {
      return null;
    }

    if (tokenData.expiresAt <= Date.now() + 30000) {
      console.log('Token expired in getCurrentToken');
      await this.logout();
      return null;
    }

    return tokenData.accessToken;
  }

  async setToken(accessToken: string) {
    const expiresAt = this.getExpirationTime({ accessToken });
    const tokenData = { accessToken, expiresAt };

    this.saveTokenData(tokenData);
    this.scheduleExpiryCheck(expiresAt);

    this.isLoggedOut = false;
    this.isLoggingOut = false;
    this.hasShownWarning = false;

    const hoursUntilExpiry = Math.round(
      (expiresAt - Date.now()) / 1000 / 60 / 60
    );
    console.log(`Token saved - expires in ${hoursUntilExpiry} hours`);
  }

  async saveTokens(tokenResponse: TokenResponse) {
    const accessToken = tokenResponse.accessToken ?? '';

    if (!accessToken) {
      throw new Error('Missing access token in response');
    }

    await this.setToken(accessToken);
    console.log('Token saved successfully');
  }

  async isTokenExpiringSoon(thresholdMinutes: number = 30): Promise<boolean> {
    if (this.isLoggedOut) {
      return true;
    }

    const tokenData = this.getTokenData();
    if (!tokenData) {
      return true;
    }

    const timeUntilExpiry = tokenData.expiresAt - Date.now();
    return timeUntilExpiry <= thresholdMinutes * 60 * 1000;
  }

  private async callLogoutAPI(): Promise<void> {
    try {
      const tokenData = this.getTokenData();
      if (tokenData?.accessToken) {
        await axios.post(
          `${BASE_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${tokenData.accessToken}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            timeout: 10000,
          }
        );
      }
    } catch (error) {
      console.error('Error occured');
    }
  }

  async logout() {
    if (this.isLoggingOut || this.isLoggedOut) {
      return;
    }

    this.isLoggingOut = true;
    this.isLoggedOut = true;

    this.clearExpiryTimer();

    try {
      await this.callLogoutAPI();

      this.clearTokenData();

      queryClient.clear();

      await this.notifyLogoutCallbacks();

      if (this.router) {
        this.router.push('/auth');
      } else if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }

      showToast(
        'success',
        'Logged Out',
        'You have been logged out successfully'
      );
    } catch (error) {
      console.error('Logout error');
      showToast('error', 'Error', 'Failed to logout properly');
    } finally {
      this.isLoggingOut = false;
    }
  }

  async destroy() {
    if (this.isLoggingOut || this.isLoggedOut) {
      return;
    }

    this.isLoggingOut = true;
    this.isLoggedOut = true;

    this.clearExpiryTimer();
    this.clearTokenData();
    this.isLoggingOut = false;
  }

  isUserLoggedOut(): boolean {
    return this.isLoggedOut;
  }

  resetLogoutState() {
    this.isLoggedOut = false;
    this.isLoggingOut = false;
    this.hasShownWarning = false;
  }

  hasValidToken(): boolean {
    const tokenData = this.getTokenData();
    if (!tokenData) {
      return false;
    }

    return tokenData.expiresAt > Date.now() + 2 * 60 * 1000;
  }

  getTimeUntilExpiry(): number | null {
    const tokenData = this.getTokenData();
    if (!tokenData) {
      return null;
    }

    const timeRemaining = tokenData.expiresAt - Date.now();
    return Math.max(0, Math.round(timeRemaining / 1000 / 60));
  }

  extendSessionAlert() {
    const timeRemaining = this.getTimeUntilExpiry();
    if (timeRemaining && timeRemaining <= 30) {
      showToast(
        'warning',
        'Session Expiring Soon',
        `Your session will expire in ${timeRemaining} minutes. Please sign in again to continue.`
      );
    }
  }
}

export const tokenManager = new TokenManager();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    tokenManager.destroy();
  });
}
