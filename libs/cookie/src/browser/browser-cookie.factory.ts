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
    const cookiesStr: string = this.document.cookie;
    if (this.lastCookies !== cookiesStr) {
      this.lastCookies = cookiesStr;

      const cookies: { [key in string]: string } = {};
      cookiesStr.split('; ').forEach(cookie => {
        const cookieSplited: string[] = cookie.split('=');
        cookies[decodeURIComponent(cookieSplited[0])] = decodeURIComponent(cookieSplited[1]);
      });
      this.cookies = cookies;
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
