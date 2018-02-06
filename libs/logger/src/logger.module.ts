import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { ConsoleLoggerProvider } from './console-logger-provider.service';
import { Level } from './level.model';
import { LOGGER_LEVEL } from './level.token';
import { LoggerProvider } from './logger-provider.service';

@NgModule()
export class LoggerModule {
  static forRoot(level?: Level): ModuleWithProviders {
    return LoggerModule.forRootWithProvider(ConsoleLoggerProvider, level);
  }

  static forRootWithProvider(provider: Type<LoggerProvider>, level?: Level): ModuleWithProviders {
    let providers: Provider[] = [LoggerProvider];
    if (level) {
      providers = [
        provider,
        { provide: LoggerProvider, useExisting: provider },
        { provide: LOGGER_LEVEL, useValue: level }
      ];
    }

    return {
      ngModule: LoggerModule,
      providers: providers
    };
  }
}
