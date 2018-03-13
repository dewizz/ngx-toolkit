import { Injectable } from '@angular/core';
import { CookieOptions as ExpressCookieOptions, Request, Response } from 'express';
import { CookieFactory } from '../cookie.service';
import { CookieOptions } from '../cookie.model';

@Injectable()
export class ServerCookieFactory implements CookieFactory {
  private cookies: { [key in string]: string };

  constructor(request: Request, private response: Response) {
    this.cookies = Object.assign({}, request.cookies);
  }

  getAll(): { [p: string]: string } {
    return this.cookies;
  }

  save(key: string, data: string, options: CookieOptions): void {
    if (!data) {
      delete this.cookies[key];
      this.response.clearCookie(key, <ExpressCookieOptions>options);
    } else {
      this.cookies[key] = data;
      this.response.cookie(key, data, <ExpressCookieOptions>options);
    }
  }
}
