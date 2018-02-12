[![Build Status](https://travis-ci.org/npetillon/ngx-toolkit.svg?branch=master)](https://travis-ci.org/npetillon/ngx-toolkit) 
[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/cookie.svg)](https://www.npmjs.com/package/@ngx-toolkit/cookie) 
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/npetillon/ngx-toolkit/blob/master/LICENSE)

# @ngx-toolkit/cookie

> Angular CookieService implementation for Browser & Server platforms implementation.

# Table of contents:
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
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

Import `BrowserCookieModule` in the root Module of your application with `forRoot(level?: Level)` to choose your log level. If you don't specify a level, you haven't any log.

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

```typescript
import { Component, OnInit } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  showAcceptCookie: boolean;
  
  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.showAcceptCookie = this.cookieService.getItem('accept-cookie') !== 'true';
  }
  
  closeAcceptCookie() {
    this.cookieService.setItem('accept-cookie', 'true');
    this.showAcceptCookie = false;
  }
}
```

# API

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
// TODO

----

# License
© 2018 Nicolas Petillon

[MIT](https://github.com/npetillon/ngx-toolkit/blob/master/LICENSE)
