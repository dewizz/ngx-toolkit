import {APP_INITIALIZER, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {ConsoleLoggerService} from './console-logger.service';
import {Level} from './level.model';
import {LOGGER_LEVEL} from './level.token';
import {LOGGER_DECORATOR_DATA} from './logger.decorator';
import {LoggerService} from './logger.service';

export function setupLoggerDecorator(loggerService: LoggerService) {
  LOGGER_DECORATOR_DATA.loggerService = loggerService;
  return () => null;
}

@NgModule()
export class LoggerModule {
  static forRoot(level: Level = null, provider: Type<LoggerService> = ConsoleLoggerService): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LOGGER_LEVEL,
          useValue: level
        },
        {
          provide: LoggerService,
          useClass: provider
        },
        {
          provide: APP_INITIALIZER,
          useFactory: setupLoggerDecorator,
          deps: [LoggerService],
          multi: true
        }
      ]
    };
  }
}
