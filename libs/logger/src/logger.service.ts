import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  /**
   * Outputs an error message.
   */
  error(message?: any, ...optionalParams: any[]) {}

  /**
   * Outputs a warning message.
   */
  warn(message?: any, ...optionalParams: any[]) {}

  /**
   * Outputs an informational message.
   */
  info(message?: any, ...optionalParams: any[]) {}

  /**
   * Outputs a debug message.
   */
  debug(message?: any, ...optionalParams: any[]) {}

  /**
   * Outputs a message.
   */
  log(message?: any, ...optionalParams: any[]) {}
}
