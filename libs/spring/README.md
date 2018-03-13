[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/spring.svg)](https://www.npmjs.com/package/@ngx-toolkit/spring) 
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)

# @ngx-toolkit/spring  
> Angular Spring utilities

# Table of contents:
* [Installation](#installation)
* [Spring Data](#spring-data)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/spring --save
# or
yarn add @ngx-toolkit/spring
```

# Spring Data

Transcription some [Spring Data Commons](https://github.com/spring-projects/spring-data-commons) classes:

- `Page<E>` type
- Order
- Sort
- `PageRequest(page: number = 0, size: number = 20, sort?: Sort)` with `toHttpParams(options?: HttpParamsOptions)` method to convert value in request params

----

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
