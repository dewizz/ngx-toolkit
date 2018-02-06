import { ModuleWithProviders, NgModule } from '@angular/core';
import { CookieService } from '../cookie.service';
import { ServerCookieService } from './server-cookie.service';

@NgModule()
export class ServerCookieModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServerCookieModule,
      providers: [
        ServerCookieService,
        {
          provide: CookieService,
          useExisting: ServerCookieService
        }
      ]
    };
  }
}
