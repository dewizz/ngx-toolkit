import { Injectable } from '@angular/core';
import { CookieService, DATE_EXPIRED, DATE_MAX_EXPIRES, RESERVED_KEY } from '../cookie.service';

@Injectable()
export class BrowserCookieService extends CookieService {
  getItem(key: string): string | null {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`
          ),
          '$1'
        )
      ) || null
    );
  }

  setItem(
    key: string,
    value: string = '',
    end: string | Date | number = Infinity,
    path: string = '/',
    domain: string = '',
    secure: boolean = true
  ): boolean {
    if (!key || RESERVED_KEY.test(key)) {
      return false;
    }

    let sExpires = '';
    if (end) {
      switch (end.constructor) {
        case Number:
          sExpires = end === Infinity ? `; expires=${DATE_MAX_EXPIRES}` : `; max-age=${end}`;
          break;
        case String:
          sExpires = `; expires=${end}`;
          break;
        case Date:
          sExpires = `; expires=${(<Date>end).toUTCString()}`;
          break;
      }
    }

    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${sExpires}${
      domain ? `; domain=${domain}` : ''
    }${path ? `; path=${path}` : ''}${secure ? '; secure' : ''}`;
    return true;
  }

  removeItem(key: string, path: string = '/', domain: string = ''): boolean {
    if (!this.hasItem(key)) {
      return false;
    }

    return this.setItem(key, '', DATE_EXPIRED, path, domain, false);
  }

  hasItem(key: string): boolean {
    if (!key || RESERVED_KEY.test(key)) {
      return false;
    }
    return new RegExp(`(?:^|;\\s*)${encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=`).test(
      document.cookie
    );
  }

  keys(): string[] {
    return document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/)
      .map(key => decodeURIComponent(key));
  }
}
