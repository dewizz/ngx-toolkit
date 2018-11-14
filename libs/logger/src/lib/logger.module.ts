import {APP_INITIALIZER, ModuleWithProviders, NgModule, Provider, Type} from '@angular/core';
import {ConsoleLoggerService} from './console-logger.service';
import {Level} from './level.model';
import {LOGGER_LEVEL} from './level.token';
import {LoggerService} from './logger.service';
import {LOGGER_DECORATOR_DATA} from './logger.decorator';

export function setupLoggerDecorator(loggerService: LoggerService) {
  LOGGER_DECORATOR_DATA.loggerService = loggerService;
  return () => null;
}

@NgModule()
export class LoggerModule {
  static forRoot(level: Level = null, provider: Type<LoggerService> = ConsoleLoggerService): ModuleWithProviders {
    let providers: Provider[];
    if (level) {
      providers = [{provide: LOGGER_LEVEL, useValue: level}, {provide: LoggerService, useClass: provider}];
    } else {
      providers = [LoggerService];
    }

    providers.push(
      {
        provide: APP_INITIALIZER,
        useFactory: setupLoggerDecorator,
        deps: [LoggerService],
        multi: true
      }
    );

    return {
      ngModule: LoggerModule,
      providers: providers
    };
  }
}
