import {DOCUMENT} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional} from '@angular/core';
import {Device} from './device.model';
import {DeviceService} from './device.service';
import {DEVICE, USER_AGENT} from './device.token';

export function deviceResolverFactory(userAgent?: string, document?: any): Device {
  if (!userAgent && document) {
    userAgent = document.defaultView?.navigator?.userAgent;
  }

  return DeviceService.resolveDevice(userAgent);
}

@NgModule()
export class DeviceModule {
  /**
   * In root module to provide the DEVICE
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DeviceModule,
      providers: [
        {
          provide: DEVICE,
          useFactory: deviceResolverFactory,
          deps: [[new Optional(), USER_AGENT], [new Optional(), DOCUMENT]]
        }
      ]
    };
  }
}
