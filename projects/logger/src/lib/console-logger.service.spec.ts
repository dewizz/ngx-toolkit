import {ConsoleLoggerService} from './console-logger.service';
import {Level} from './level.model';
import {LoggerService} from './logger.service';

describe('ConsoleLoggerService', () => {
  let service: LoggerService;
  const toSpy: any = {
    log: function(message?: any, ...optionalParams: any[]) {
      // NOTHING
    }
  };

  beforeEach(() => {
    // Override console
    ['error', 'warn', 'info', 'debug', 'log'].forEach(level => {
      console[level] = (...args: any[]) => {
        toSpy.log.apply(toSpy, args);
      };
    });

    spyOn(toSpy, 'log');
  });

  it('check console logger called', () => {
    service = new ConsoleLoggerService(Level.LOG);

    const consoleArgs: any = 'args';

    service.error('error', consoleArgs);
    expect(toSpy.log).toHaveBeenCalledWith('error', consoleArgs);

    service.warn('warn', consoleArgs);
    expect(toSpy.log).toHaveBeenCalledWith('warn', consoleArgs);

    service.info('info', consoleArgs);
    expect(toSpy.log).toHaveBeenCalledWith('info', consoleArgs);

    service.debug('debug', consoleArgs);
    expect(toSpy.log).toHaveBeenCalledWith('debug', consoleArgs);

    service.log('log', consoleArgs);
    expect(toSpy.log).toHaveBeenCalledWith('log', consoleArgs);
  });

  it('check console logger level', () => {
    service = new ConsoleLoggerService(Level.WARN);

    service.error('error');
    expect(toSpy.log).toHaveBeenCalledWith('error');

    service.warn('warn');
    expect(toSpy.log).toHaveBeenCalledWith('warn');

    service.info('info');
    expect(toSpy.log).not.toHaveBeenCalledWith('info');

    service.debug('debug');
    expect(toSpy.log).not.toHaveBeenCalledWith('debug');

    service.log('log');
    expect(toSpy.log).not.toHaveBeenCalledWith('log');
  });
});
