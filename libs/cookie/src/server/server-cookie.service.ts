import { Inject, Injectable } from '@angular/core';
import { REQUEST, RESPONSE } from './server.token';
import { CookieOptions, Request, Response } from 'express';
import { CookieService, DATE_MAX_EXPIRES } from '../cookie.service';

@Injectable()
export class ServerCookieService extends CookieService {
  constructor(@Inject(REQUEST) private request: Request, @Inject(RESPONSE) private response: Response) {
    super();
  }

  getItem(key: string): string | null {
    return this.request.cookies[key];
  }

  setItem(
    key: string,
    value: string = '',
    end: string | Date | number = Infinity,
    path: string = '/',
    domain: string = '',
    secure: boolean = true
  ): boolean {
    const options = { path: path, secure: secure } as CookieOptions;
    if (end) {
      switch (end.constructor) {
        case Number:
          if (end === Infinity) {
            options.expires = new Date(DATE_MAX_EXPIRES);
          } else {
            options.maxAge = <number>end;
          }
          break;
        case String:
          options.expires = new Date(<string>end);
          break;
        case Date:
          options.expires = <Date>end;
          break;
      }
    }
    if (domain) {
      options.domain = domain;
    }

    this.request.cookies[key] = value;
    this.response.cookie(key, value, options);
    return true;
  }

  removeItem(key: string, path: string = '/', domain: string = ''): boolean {
    const options = { path: path } as CookieOptions;
    if (domain) {
      options.domain = domain;
    }

    this.request.clearCookie(key, options);
    this.response.clearCookie(key, options);
    return true;
  }

  hasItem(key: string): boolean {
    return this.request.cookies.hasOwnProperty(key);
  }

  keys(): string[] {
    return Object.keys(this.request.cookies);
  }
}
