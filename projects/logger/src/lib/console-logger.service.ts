import {Inject, Injectable, Optional} from '@angular/core';
import {Level} from './level.model';
import {LOGGER_LEVEL} from './level.token';
import {LoggerService} from './logger.service';

@Injectable()
export class ConsoleLoggerService extends LoggerService {
  constructor(@Optional() @Inject(LOGGER_LEVEL) level: Level) {
    super();

    if (level) {
      Object.keys(Level)
        .filter(s => isNaN(+s) && level >= Level[s])
        .forEach(levelName => {
          const methodName: string = levelName.toLowerCase();
          this[methodName] = console[methodName].bind(console);
        });
    }
  }
}
