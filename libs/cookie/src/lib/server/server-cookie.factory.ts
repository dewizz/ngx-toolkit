import {CookieFactory} from '../cookie.service';
import {CookieOptions} from '../cookie.model';

export class ServerCookieFactory implements CookieFactory {
  private cookies: { [key in string]: string };

  constructor(request: any, private response: any) {
    this.cookies = Object.assign({}, request.cookies);
  }

  getAll(): { [p: string]: string } {
    return this.cookies;
  }

  save(key: string, data: string, options: CookieOptions): void {
    if (!data) {
      delete this.cookies[key];
      this.response.clearCookie(key, options);
    } else {
      this.cookies[key] = data;
      this.response.cookie(key, data, options);
    }
  }
}
