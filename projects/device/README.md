[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/device.svg)](https://www.npmjs.com/package/@ngx-toolkit/device) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![Coverage](https://coveralls.io/repos/github/dewizz/ngx-toolkit/badge.svg?branch=master#5)](https://coveralls.io/github/dewizz/ngx-toolkit?branch=master)
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# @ngx-toolkit/device
> Angular Device detection for Browser & Server platforms

# Table of contents:
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
  * [Device](#device)
* [Universal Usage](#universal-usage)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/device --save
# or
yarn add @ngx-toolkit/device
```

Registered `DeviceModule` in the root Module of your application with `forRoot()` static method.

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DeviceModule } from '@ngx-toolkit/device';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, DeviceModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

# Usage

```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { DEVICE, Device } from '@ngx-toolkit/device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(@Inject(DEVICE) device: Device) {
    console.log(device.isMobile());
  }

}
```

# API

## Device

The `Device` API:

```typescript
enum DeviceType {
  TABLET,
  MOBILE,
  NORMAL
}

enum DevicePlatform {
  ANDROID,
  IOS,
  UNKNOWN
}

interface Device {
  type: DeviceType;
  platform: DevicePlatform;

  isNormal(): boolean;
  isMobile(): boolean;
  isTablet(): boolean;
}
```

# Universal Usage

You just have to provide an UserAgent.

Sample with [@nguniversal/express-engine](https://github.com/angular/universal/tree/master/modules/express-engine): 

```typescript
import { NgModule }      from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine';
import { USER_AGENT } from '@ngx-toolkit/device';

import { AppModule }  from './app.module';
import { AppComponent }  from './app.component';

export function userAgentFactory(request: any) {
  return request.get('User-Agent');
}

@NgModule({
  imports: [ AppModule, ServerModule ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: USER_AGENT,
      useFactory: userAgentFactory,
      deps: [REQUEST]
    }
  ],
})
export class AppServerModule { }
```

----

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
