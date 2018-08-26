[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/utils.svg)](https://www.npmjs.com/package/@ngx-toolkit/utils) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![Coverage](https://coveralls.io/repos/github/dewizz/ngx-toolkit/badge.svg?branch=master#5)](https://coveralls.io/github/dewizz/ngx-toolkit?branch=master)
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# @ngx-toolkit/utils  
> Angular common utilities

# Table of contents:
* [Installation](#installation)
* [Queue](#queue)
* [Wait](#wait)
* [Once](#once)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/utils --save
# or
yarn add @ngx-toolkit/utils
```

# Queue

Queue annotation:

```typescript
import { Queue } from '@ngx-toolkit/utils';
...

class MyComponent {
  /**
   * Put the method call in a queue and wait for a Promise / Subscription / method execution
   * /!\ the method result is modified => Return a Promise
   * @param {number} queue limit (default: no limit)
   * @param {string} queue name (default: method name)
   */
  @Queue(limit?: number, name?: string)
  method(): Promise | Subscription | any | void;
}
```

# Wait

Wait annotation (shortcut of @Queue(1)):

```typescript
import { Wait } from '@ngx-toolkit/utils';
...

class MyComponent {
  /**
   * Wait for a Promise / Subscription before to be re-executed
   * /!\ the method result is modified => Return a Promise
   * @param {string} wait name (default: method name)
   */
  @Wait(name?: string)
  method(): Promise | Subscription | any | void;
}
```

# Once

Once annotation:

```typescript
import { Once } from '@ngx-toolkit/utils';
...

class MyComponent {
  /**
   * mark a method to be executed no more than once even if called several times
   * @param {string} name (default: method name)
   */
  @Once(name?: string)
  method(): Promise | Subscription | any | void;
}
```

----

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
