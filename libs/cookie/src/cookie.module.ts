import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieFactory, CookieService } from './cookie.service';
import { CookieOptions } from './cookie.model';
import { COOKIE_DECORATOR_DATA } from './cookie.decorator';
import { COOKIE_OPTIONS } from './cookie.token';
import { BrowserCookieFactory } from './browser';

export function setupCookieDecorator(cookieService: CookieService) {
  COOKIE_DECORATOR_DATA.cookieService = cookieService;
  return () => null;
}

@NgModule()
export class CookieModule {
  // static cookieService: CookieService = null;// = new CookieService(null, new BrowserCookieFactory(document));

  /**
   * In root module to provide the CookieService & CookieOptions
   * @param {CookieOptions} cookieOptions
   * @returns {ModuleWithProviders}
   */
  static forRoot(cookieOptions?: CookieOptions): ModuleWithProviders {
    console.log('ok');
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
          useFactory: setupCookieDecorator,
          deps: [CookieService],
          multi: true
        }
      ]
    };
  }
}
