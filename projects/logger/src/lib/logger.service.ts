import {Injectable} from '@angular/core';
import {Level} from './level.model';

@Injectable()
export class LoggerService {

  /**
   * Outputs an error message.
   */
  error(message?: any, ...optionalParams: any[]) {
  }

  /**
   * Outputs a warning message.
   */
  warn(message?: any, ...optionalParams: any[]) {
  }

  /**
   * Outputs an informational message.
   */
  info(message?: any, ...optionalParams: any[]) {
  }

  /**
   * Outputs a debug message.
   */
  debug(message?: any, ...optionalParams: any[]) {
  }

  /**
   * Outputs a message.
   */
  log(message?: any, ...optionalParams: any[]) {
  }

  /**
   * Outputs a message.
   */
  logLevel(level: Level, message?: any, ...optionalParams: any[]) {
    switch (level) {
      case Level.ERROR :
        this.error(message, ...optionalParams);
        break;
      case Level.WARN :
        this.warn(message, ...optionalParams);
        break;
      case Level.INFO :
        this.info(message, ...optionalParams);
        break;
      case Level.DEBUG :
        this.debug(message, ...optionalParams);
        break;
      case Level.LOG :
        this.log(message, ...optionalParams);
        break;
    }
  }

}
