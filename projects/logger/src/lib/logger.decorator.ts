import {Level} from './level.model';
import {LoggerService} from './logger.service';

export interface LoggerDecoratorData {
  loggerService?: LoggerService;
}

export const LOGGER_DECORATOR_DATA: LoggerDecoratorData = {};

export function Debug(message?: string): MethodDecorator {
  return Log(message, Level.DEBUG);
}

export function Log(message?: string, level: Level = Level.INFO): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const result = originalMethod.apply(this, args);
      if (LOGGER_DECORATOR_DATA.loggerService) {
        LOGGER_DECORATOR_DATA.loggerService.logLevel(level, message || `Call ${propertyKey.toString()}`, args, result);
      }
      return result;
    };
    return descriptor;
  };
}
