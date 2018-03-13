import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Device } from './device.model';
import { DEVICE, USER_AGENT } from './device.token';
import { DeviceService } from './device.service';

export function deviceResolverFactory(userAgent?: string): Device {
  if (!userAgent && window) {
    userAgent = window.navigator.userAgent;
  }

  return DeviceService.resolveDevice(userAgent);
}

@NgModule()
export class DeviceModule {
  /**
   * In root module to provide the DEVICE
   * @returns {ModuleWithProviders}
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DeviceModule,
      providers: [
        {
          provide: DEVICE,
          useFactory: deviceResolverFactory,
          deps: [[new Optional(), USER_AGENT]]
        }
      ]
    };
  }
}
