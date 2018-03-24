import { TestBed } from '@angular/core/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';
import { ConsoleLoggerService } from './console-logger.service';
import { Level } from './level.model';

describe('LoggerModule', () => {
  it('should work', () => {
    expect(new LoggerModule()).toBeDefined();
  });

  it('should not instantiate serivce', () => {
    TestBed.configureTestingModule({ imports: [LoggerModule.forRoot(null, ConsoleLoggerService)] });

    const service: LoggerService = TestBed.get(LoggerService);
    expect(service instanceof ConsoleLoggerService).toBeFalsy();
    expect(service instanceof LoggerService).toBeTruthy();
  });

  it('should not instantiate serivce', () => {
    TestBed.configureTestingModule({ imports: [LoggerModule.forRoot(Level.LOG, ConsoleLoggerService)] });

    const service: LoggerService = TestBed.get(LoggerService);
    expect(service instanceof ConsoleLoggerService).toBeTruthy();
  });
});
