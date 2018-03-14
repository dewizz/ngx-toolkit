import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieFactory, CookieService } from './cookie.service';
import { CookieOptions } from './cookie.model';
import { COOKIE_DECORATOR_DATA } from './cookie.decorator';
import { COOKIE_OPTIONS } from './cookie.token';
import { BrowserCookieFactory } from './browser';

export function initData(cookieService: CookieService): Function {
  return () => {
    COOKIE_DECORATOR_DATA.cookieService = cookieService;
  };
}

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
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initData,
          deps: [CookieService],
          multi: true
        }
      ]
    };
  }
}
