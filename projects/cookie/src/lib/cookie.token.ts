import {InjectionToken} from '@angular/core';
import {CookieOptions} from './cookie.model';

export const COOKIE_OPTIONS = new InjectionToken<CookieOptions>('COOKIE_OPTIONS');
