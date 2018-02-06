import { InjectionToken } from '@angular/core';
import { Level } from './level.model';

export const LOGGER_LEVEL = new InjectionToken<Level>('LoggerLevelToken');
