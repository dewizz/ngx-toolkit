export const RESERVED_KEY: RegExp = /^(?:expires|max\-age|path|domain|secure)$/i;
export const DATE_MAX_EXPIRES = 'Fri, 31 Dec 9999 23:59:59 GMT';
export const DATE_EXPIRED = 'Thu, 01 Jan 1970 00:00:00 GMT';

export abstract class CookieService {
  abstract getItem(key: string): string | null;

  abstract setItem(
    key: string,
    value?: string,
    end?: string | Date | number,
    path?: string,
    domain?: string,
    secure?: boolean
  ): boolean;

  abstract removeItem(key: string, path?: string, domain?: string): boolean;

  abstract hasItem(key: string): boolean;

  abstract keys(): string[];
}
