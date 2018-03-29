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
    let _value: any;

    if (delete target[key]) {
      const cookieName: string = name || key;

      Object.defineProperty(target, key, {
        get: function() {
          if (COOKIE_DECORATOR_DATA.cookieService) {
            return JSON.parse(COOKIE_DECORATOR_DATA.cookieService.getItem(cookieName));
          } else {
            return _value;
          }
        },
        set: function(value) {
          if (COOKIE_DECORATOR_DATA.cookieService) {
            COOKIE_DECORATOR_DATA.cookieService.setItem(cookieName, JSON.stringify(value), options);
          } else {
            _value = value;
          }
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}
