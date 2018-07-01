import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { ConsoleLoggerService } from './console-logger.service';
import { Level } from './level.model';
import { LOGGER_LEVEL } from './level.token';
import { LoggerService } from './logger.service';

@NgModule()
export class LoggerModule {
  static forRoot(level: Level = null, provider: Type<LoggerService> = ConsoleLoggerService): ModuleWithProviders {
    let providers: Provider[];
    if (level) {
      providers = [{ provide: LOGGER_LEVEL, useValue: level }, { provide: LoggerService, useClass: provider }];
    } else {
      providers = [LoggerService];
    }

    return {
      ngModule: LoggerModule,
      providers: providers
    };
  }
}
