import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST, RESPONSE } from './server.token';
import { CookieOptions as ExpressCookieOptions, Request, Response } from 'express';
import { CookieService } from '../cookie.service';
import { CookieOptions } from '../cookie.model';

@Injectable()
export class ServerCookieService extends CookieService {
  private cookies: { [key in string]: string };

  constructor(
    @Optional() cookieOptions: CookieOptions,
    @Inject(REQUEST) request: Request,
    @Inject(RESPONSE) private response: Response
  ) {
    super(cookieOptions);
    this.cookies = Object.assign({}, request.cookies);
  }

  getAll(): { [p: string]: string } {
    return this.cookies;
  }

  protected saveCookie(key: string, data: string, options: CookieOptions): void {
    if (!data) {
      delete this.cookies[key];
      this.response.clearCookie(key, <ExpressCookieOptions>options);
    } else {
      this.cookies[key] = data;
      this.response.cookie(key, data, <ExpressCookieOptions>options);
    }
  }
}
