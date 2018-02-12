import { ModuleWithProviders, NgModule } from '@angular/core';
import { CookieService } from '../cookie.service';
import { BrowserCookieService } from './browser-cookie.service';

@NgModule()
export class BrowserCookieModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BrowserCookieModule,
      providers: [
        {
          provide: CookieService,
          useClass: BrowserCookieService
        }
      ]
    };
  }
}
