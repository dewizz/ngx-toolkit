import { ModuleWithProviders, NgModule } from '@angular/core';
import { CookieService, CookieFactory } from './cookie.service';
import { CookieOptions } from './cookie.model';
import { COOKIE_OPTIONS } from './cookie.token';
import { BrowserCookieFactory } from './browser';
import { DOCUMENT } from '@angular/common';

@NgModule()
export class CookieModule {
  /**
   * In root module to provide the CookieService & CookieOptions
   * @param {CookieOptions} cookieOptions
   * @returns {ModuleWithProviders}
   */
  static forRoot(cookieOptions?: CookieOptions): ModuleWithProviders {
    return {
      ngModule: CookieModule,
      providers: [
        CookieService,
        {
          provide: CookieFactory,
          useClass: BrowserCookieFactory,
          deps: [DOCUMENT]
        },
        {
          provide: COOKIE_OPTIONS,
          useValue: cookieOptions
        }
      ]
    };
  }
}
