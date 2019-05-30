[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/logger.svg)](https://www.npmjs.com/package/@ngx-toolkit/logger) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![Coverage](https://coveralls.io/repos/github/dewizz/ngx-toolkit/badge.svg?branch=master#5)](https://coveralls.io/github/dewizz/ngx-toolkit?branch=master)
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# @ngx-toolkit/logger  
> Angular LoggerService (with default `ConsoleLoggerService` implementation)

# Table of contents:
* [Installation](#installation)
* [Usage](#usage)
* [LoggerService](#loggerservice)
* [Custom Implementation](#custom-implementation)
* [Logger rxjs operator](#logger-rxjs-operator)
* [Logger decorator](#logger-decorator)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/logger --save
# or
yarn add @ngx-toolkit/logger
```

Import `LoggerModule` in the root Module of your application with `forRoot(level?: Level)` to choose your log level. If you don't specify a level, you haven't any log.

```typescript
import { NgModule, isDevMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule, Level } from '@ngx-toolkit/logger';

import { AppComponent }  from './app.component';

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  imports: [ BrowserModule, LoggerModule.forRoot(LOG_LEVEL) ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

# Usage

```typescript
import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@ngx-toolkit/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.logger.info('OnInit my AppCommponent');
  }
}
```

# LoggerService

The `LoggerSerivce` API:

```typescript
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
```

# Custom implementation

You can create you own implementation. Our sample with the [winston](https://github.com/winstonjs/winston) API:

```typescript
import { Inject, Injectable } from '@angular/core';
import { LoggerService, LOGGER_LEVEL, Level } from '@ngx-toolkit/logger';
import winston from 'winston';

@Injectable()
export class WinstonLoggerService extends LoggerService {
  private logger: any;
  
  constructor(@Inject(LOGGER_LEVEL) level: Level) {
    super();

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'combined.log',
          level: 'info'
        })
      ]
    });
  }
  
  info(message?: any, ...optionalParams: any[]) {
    this.logger.info(message, optionalParams);
  }
  
  ...
}
```

To register WinstonLoggerService in the Angular application, provide the `LoggerModule` with `forRoot(level?: Level, provider?: Type<LoggerService>,)` as:

```typescript
import { NgModule, isDevMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule, Level } from '@ngx-toolkit/logger';

import { WinstonLoggerService } from './winston-logger.service';
import { AppComponent }  from './app.component';

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  imports: [ BrowserModule, LoggerModule.forRoot(LOG_LEVEL, WinstonLoggerService) ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

# Logger rxjs operator

- logger<T>(message: string,
                            nextLevel: Level = Level.INFO,
                            errorLevel: Level = Level.ERROR,
                            completeLevel?: Level): MonoTypeOperatorFunction<T> 

```typescript
import { Component, OnInit } from '@angular/core';
import { logger } from '@ngx-toolkit/logger';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    timer(1000, 2000).pipe(
      logger('timer')
    ).subscribe();
  }
}
```

# Logger decorator

- Log(message?: string, level: Level = Level.INFO)
- Debug(message?: string) : Alias of Log(message?: string, Level.DEBUG)

```typescript
import { Component, OnInit } from '@angular/core';
import { Debug } from '@ngx-toolkit/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  @Debug()
  action(param: string) {
    return "result";
  }
}
```

----

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
