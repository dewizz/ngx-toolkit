import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieFactory } from '../cookie.service';
import { CookieOptions } from '../cookie.model';

@Injectable()
export class BrowserCookieFactory implements CookieFactory {
  private lastCookies = '';
  private cookies: { [key in string]: string } = {};

  constructor(@Inject(DOCUMENT) private document: any) {}

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

  save(key: string, data: string, options: CookieOptions): void {
    this.document.cookie = `${encodeURIComponent(key)}=${data ? encodeURIComponent(data) : ''}${
      options.expires ? `; expires=${(<Date>options.expires).toUTCString()}` : ''
    }${options.domain ? `; domain=${options.domain}` : ''}${options.path ? `; path=${options.path}` : ''}${
      options.secure ? '; secure' : ''
    }`;
  }
}
