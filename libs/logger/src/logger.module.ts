import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { ConsoleLoggerService } from './console-logger.service';
import { Level } from './level.model';
import { LOGGER_LEVEL } from './level.token';
import { LoggerService } from './logger.service';

@NgModule()
export class LoggerModule {
  static forRoot(level?: Level): ModuleWithProviders {
    return LoggerModule.forRootWithProvider(ConsoleLoggerService, level);
  }

  static forRootWithProvider(provider: Type<LoggerService>, level?: Level): ModuleWithProviders {
    let providers: Provider[] = [LoggerService];
    if (level) {
      providers = [
        provider,
        { provide: LoggerService, useExisting: provider },
        { provide: LOGGER_LEVEL, useValue: level }
      ];
    }

    return {
      ngModule: LoggerModule,
      providers: providers
    };
  }
}
