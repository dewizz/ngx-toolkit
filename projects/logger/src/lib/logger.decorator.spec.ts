import {ConsoleLoggerService} from './console-logger.service';
import {Level} from './level.model';
import {Debug, LOGGER_DECORATOR_DATA} from './logger.decorator';

describe('LoggerDecorator', () => {
  beforeEach(() => {
    LOGGER_DECORATOR_DATA.loggerService = new ConsoleLoggerService(Level.DEBUG);

    spyOn(LOGGER_DECORATOR_DATA.loggerService, 'debug');
  });

  it('should work', () => {
    class Test {
      @Debug('increment')
      toto(n: number): number {
        return n + 1;
      }
    }

    const test: Test = new Test();
    expect(test.toto(1)).toBe(2);
    expect(LOGGER_DECORATOR_DATA.loggerService.debug).toHaveBeenCalledWith('increment', [1], 2);
  });
});
