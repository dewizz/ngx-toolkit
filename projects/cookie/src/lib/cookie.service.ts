import {Inject, Injectable, Optional} from '@angular/core';
import {CookieOptions} from './cookie.model';
import {COOKIE_OPTIONS} from './cookie.token';

export const DATE_MAX_EXPIRES: Date = new Date('Fri, 31 Dec 9999 23:59:59 GMT');
export const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  expires: Infinity
};

export abstract class CookieFactory {
  /**
   * Get all cookies in object format.
   */
  abstract getAll(): { [key: string]: string };

  /**
   * Implementation (create / update / delete)
   */
  abstract save(key: string, data: string, options: CookieOptions): void;
}

@Injectable()
export class CookieService {
  private cookieOptions: CookieOptions;

  constructor(
    @Optional()
    @Inject(COOKIE_OPTIONS)
      cookieOptions: CookieOptions,
    private cookieFactory: CookieFactory
  ) {
    this.cookieOptions = cookieOptions || DEFAULT_COOKIE_OPTIONS;
  }

  /**
   * Returns an integer representing the number of cookie items.
   */
  get length(): number {
    return this.keys().length;
  }

  /**
   * Transform to expires Date
   */
  private static getExpiresDate(expires?: Date | string | number): Date {
    if (!expires) {
      return null;
    }

    switch (expires.constructor) {
      case Number:
        return expires === Infinity ? DATE_MAX_EXPIRES : new Date(<number>expires * 1000 + Date.now());
      case String:
        return new Date(<string>expires);
      default:
        return <Date>expires;
    }
  }

  /**
   * Get all cookies in object format.
   */
  getAll(): { [key: string]: string } {
    return this.cookieFactory.getAll();
  }

  /**
   * Read a cookie. If the cookie doesn't exist a null value will be returned.
   */
  getItem(key: string): string | null {
    return this.getAll()[key] || null;
  }

  /**
   * Check whether a cookie exists in the current position.
   */
  hasItem(key: string): boolean {
    return this.getAll().hasOwnProperty(key);
  }

  /**
   * Return all cookie names.
   */
  keys(): string[] {
    return Object.keys(this.getAll());
  }

  /**
   * Return the cookie name at a index.
   */
  key(index: number): string | null {
    return this.keys()[index] || null;
  }

  /**
   * Add that cookie to the storage, or update that cookie's value if it already exists.
   */
  setItem(key: string, data?: string, options?: CookieOptions): void {
    if (!key) {
      return;
    }

    // Merge options
    options = Object.assign({}, this.cookieOptions, options || {});

    // Remove data
    if (!data) {
      options.expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    }

    // Convert expires to Date
    if (options.expires) {
      options.expires = CookieService.getExpiresDate(options.expires);
    }

    this.cookieFactory.save(key, data, options);
  }

  /**
   * Delete a cookie.
   */
  removeItem(key: string, options?: CookieOptions): void {
    return this.setItem(key, null, options);
  }

  /**
   * Remove all cookie.
   */
  clear(options?: CookieOptions): void {
    this.keys().forEach(key => {
      this.removeItem(key, options);
    });
  }
}
