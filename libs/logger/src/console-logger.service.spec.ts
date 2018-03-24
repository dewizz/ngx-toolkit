import { LoggerService } from './logger.service';
import { ConsoleLoggerService } from './console-logger.service';
import { Level } from './level.model';

describe('ConsoleLoggerService', () => {
  it('check console logger', () => {
    // Override console
    const toSpy: any = {
      log: function(level: string) {
        // NOTHING
      }
    };
    ['error', 'warn', 'info', 'debug', 'log'].forEach(level => {
      console[level] = function() {
        toSpy.log(level);
      };
    });

    // Create service
    const loggerService: LoggerService = new ConsoleLoggerService(Level.INFO);

    spyOn(toSpy, 'log');

    loggerService.error();
    expect(toSpy.log).toHaveBeenCalledWith('error');

    loggerService.warn();
    expect(toSpy.log).toHaveBeenCalledWith('warn');

    loggerService.info();
    expect(toSpy.log).toHaveBeenCalledWith('info');

    loggerService.debug();
    expect(toSpy.log).not.toHaveBeenCalledWith('debug');

    loggerService.log();
    expect(toSpy.log).not.toHaveBeenCalledWith('log');
  });
});
