import {MonoTypeOperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LOGGER_DECORATOR_DATA} from './logger.decorator';
import {Level} from './level.model';

export function logger<T>(message: string,
                          nextLevel: Level = Level.INFO,
                          errorLevel: Level = Level.ERROR,
                          completeLevel?: Level): MonoTypeOperatorFunction<T> {
  return tap(x => {
    if (LOGGER_DECORATOR_DATA.loggerService) {
      LOGGER_DECORATOR_DATA.loggerService.logLevel(nextLevel, message, x);
    }
  }, e => {
    if (LOGGER_DECORATOR_DATA.loggerService) {
      LOGGER_DECORATOR_DATA.loggerService.logLevel(errorLevel, message, e);
    }
  }, () => {
    if (LOGGER_DECORATOR_DATA.loggerService && completeLevel) {
      LOGGER_DECORATOR_DATA.loggerService.logLevel(completeLevel, message);
    }
  });
}
