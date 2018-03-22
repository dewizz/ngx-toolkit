import { CookieOptions } from './cookie.model';
import { CookieService } from './cookie.service';

export interface CookieDecoratorData {
  cookieService?: CookieService;
}
export const COOKIE_DECORATOR_DATA: CookieDecoratorData = {};

/**
 * Get / Set cookie
 * @param {string} name (default is the property name)
 * @param {CookieOptions} options (to override default options)
 * @returns {PropertyDecorator}
 * @constructor
 */
export function Cookie(name?: string, options?: CookieOptions): PropertyDecorator {
  return function(target: any, key: string) {
    if (COOKIE_DECORATOR_DATA.cookieService && delete target[key]) {
      const cookieName: string = name || key;

      Object.defineProperty(target, key, {
        get: function() {
          return JSON.parse(COOKIE_DECORATOR_DATA.cookieService.getItem(cookieName));
        },
        set: function(value) {
          COOKIE_DECORATOR_DATA.cookieService.setItem(cookieName, JSON.stringify(value), options);
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}
