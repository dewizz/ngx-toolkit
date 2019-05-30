import { InjectionToken } from '@angular/core';
import { Device } from './device.model';

export const USER_AGENT = new InjectionToken<string>('USER_AGENT');
export const DEVICE = new InjectionToken<Device>('DEVICE');
