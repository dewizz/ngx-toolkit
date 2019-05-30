[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/cookie.svg)](https://www.npmjs.com/package/@ngx-toolkit/cookie) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![Coverage](https://coveralls.io/repos/github/dewizz/ngx-toolkit/badge.svg?branch=master#5)](https://coveralls.io/github/dewizz/ngx-toolkit?branch=master)
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# @ngx-toolkit/cookie

> Angular CookieService implementation for Browser & Server platforms.

# Table of contents:
* [Installation](#installation)
* [Usage with...](#usage)
  * [annotation](#usage-annotation)
  * [service](#usage-service)
* [API](#api)
  * [Cookie](#cookie)
  * [CookieService](#cookieservice)
  * [CookieOptions](#cookieoptions)
* [Universal Usage](#universal-usage)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/cookie --save
# or
yarn add @ngx-toolkit/cookie
```

Registered `CookieModule` in the root Module of your application with `forRoot(cookieOptions?: CookieOptions)` static method.
*CookieOptions is optional, by default the path is set to '/' and cookies never expired.*

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from '@ngx-toolkit/cookie';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, CookieModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

# Usage

## <a name="usage-annotation"></a>Annotation
```typescript
import { Component, OnInit } from '@angular/core';
import { Cookie } from '@ngx-toolkit/cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @Cookie('accept-cookie')
  acceptedCookie: boolean;
  
  acceptCookie() {
    this.acceptedCookie = true;
  }
}
```

## <a name="usage-service"></a>Service
```typescript
import { Component, OnInit } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  acceptedCookie: boolean;
  
  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.acceptedCookie = this.cookieService.getItem('accept-cookie') === 'true';
  }
  
  acceptCookie() {
    this.cookieService.setItem('accept-cookie', 'true');
    this.acceptedCookie = true;
  }
}
```

# API

## Cookie

Cookie annotation:
```typescript
/**
 * Get / Set cookie 
 * @param {string} name (default is the property name)
 * @param {CookieOptions} options (to override default options)
 */
@Cookie(name?: string, options?: CookieOptions)
property: any;
```

## CookieService

The `CookieSerivce` API:

```typescript
interface CookieService {
  
  /**
   * Get all cookies in object format.
   *
   * @returns {{[p: string]: string}}
   */
  getAll(): { [key: string]: string };
  
  /**
   * Read a cookie. If the cookie doesn't exist a null value will be returned.
   *
   * @param key The name of the cookie to read (string).
   * @param {string} key
   * @returns {string | null}
   */
  getItem(key: string): string | null;
  
  /**
   * Check whether a cookie exists in the current position.
   *
   * @param key The name of the cookie to test (string).
   * @returns {boolean}
   */
  hasItem(key: string): boolean;
  
  /**
   * Add that cookie to the storage, or update that cookie's value if it already exists.
   *
   * @param {string} The name of the cookie you want to create/update.
   * @param {string} the value you want to give the cookie you are creating/updating.
   * @param {CookieOptions} Override default options
   */
  setItem(key: string, data?: string, options?: CookieOptions): void;
  
  /**
   * Delete a cookie.
   *
   * @param {string} The name of the cookie to remove
   * @param {CookieOptions} Override default options
   */
  removeItem(key: string, options?: CookieOptions): void;

  /**
   * Remove all cookie.
   *
   * @param {CookieOptions} Override default options
   */
  clear(options?: CookieOptions): void;
  
  /**
   * Return all cookie names.
   *
   * @returns {any} Cookie names
   */
  keys(): string[];
  
  /**
   * Returns an integer representing the number of cookie items.
   *
   * @returns {number}
   */
  get length(): number;
  
  /**
   * Return the cookie name at a index.
   *
   * @param {number} The index position.
   * @returns {any} The cookie name or null
   */
  key(index: number): string | null;
}
```

## CookieOptions

```typescript
class CookieOptions {
  /**
   * The path from where the cookie will be readable.
   */
  path?: string;
  /**
   * The domain from where the cookie will be readable.
   */
  domain?: string;
  /**
   * The expiration :
   *  - in seconds for the max-age
   *  - Infinity for a never expiration
   *  - Date in GMTString format
   *  - Date object
   *
   *  If not specified the cookie will expire at the end of the session.
   */
  expires?: Date | string | number;
  /**
   * If true, the cookie will be transmitted only over secure protocol as https.
   */
  secure?: boolean;
}
```

# Universal Usage

You just have to provide another `CookieFactory` implemantation.

`ServerCookieFactory` implementation is available (works with express only).
Sample with [@nguniversal/express-engine](https://github.com/angular/universal/tree/master/modules/express-engine): 

```typescript
import { NgModule }      from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine';
import { CookieFactory, ServerCookieFactory } from '@ngx-toolkit/cookie';

import { AppModule }  from './app.module';
import { AppComponent }  from './app.component';

export function newCookieFactory(req: any, res: any) {
  return new ServerCookieFactory(req, res);
}

@NgModule({
  imports: [ AppModule, ServerModule ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: CookieFactory,
      useFactory: newCookieFactory,
      deps: [REQUEST, RESPONSE]
    }
  ],
})
export class AppServerModule { }
```

----

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
