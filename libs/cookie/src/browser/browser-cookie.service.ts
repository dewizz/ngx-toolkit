import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from '../cookie.service';
import { CookieOptions } from '../cookie.model';

@Injectable()
export class BrowserCookieService extends CookieService {
  private lastCookies = '';
  private cookies: { [key in string]: string } = {};

  constructor(@Optional() cookieOptions: CookieOptions, @Inject(DOCUMENT) private document: any) {
    super(cookieOptions);
  }

  getAll(): { [p: string]: string } {
    if (this.lastCookies !== this.document.cookie) {
      this.lastCookies = this.document.cookie;

      this.cookies = Object.assign(
        {},
        ...this.document.cookie.split('; ').map(cookie => {
          const cookieSplited: string[] = cookie.split('=');
          return { [decodeURIComponent(cookieSplited[0])]: decodeURIComponent(cookieSplited[1]) };
        })
      );
    }
    return this.cookies;
  }

  protected saveCookie(key: string, data: string, options: CookieOptions): void {
    this.document.cookie = `${encodeURIComponent(key)}=${data ? encodeURIComponent(data) : ''}${
      options.expires ? `; expires=${(<Date>options.expires).toUTCString()}` : ''
    }${options.domain ? `; domain=${options.domain}` : ''}${options.path ? `; path=${options.path}` : ''}${
      options.secure ? '; secure' : ''
    }`;
  }
}
