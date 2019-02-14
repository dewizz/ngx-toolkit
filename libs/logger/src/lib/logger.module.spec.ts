import {ApplicationInitStatus} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {LoggerModule} from './logger.module';
import {LoggerService} from './logger.service';
import {LOGGER_DECORATOR_DATA} from './logger.decorator';
import {ConsoleLoggerService} from './console-logger.service';
import {Level} from './level.model';

describe('LoggerModule', () => {
  it('should work', () => {
    expect(new LoggerModule()).toBeDefined();
  });

  it('should instantiate service', () => {
    TestBed.configureTestingModule({imports: [LoggerModule.forRoot(Level.LOG, ConsoleLoggerService)]});

    const service: LoggerService = TestBed.get(LoggerService);
    expect(service instanceof ConsoleLoggerService).toBeTruthy();
  });

  it('should configure LOGGER_DECORATOR_DATA', async (done: DoneFn) => {
    await TestBed.configureTestingModule({
      imports: [LoggerModule.forRoot()]
    })
    // https://github.com/angular/angular/issues/24218
      .get(ApplicationInitStatus).donePromise;

    expect(LOGGER_DECORATOR_DATA.loggerService).toBeDefined();
    done();
  });
});
