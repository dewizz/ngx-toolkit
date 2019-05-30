[![npm version](https://img.shields.io/npm/v/@ngx-toolkit/cache.svg)](https://www.npmjs.com/package/@ngx-toolkit/cache) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dewizz/ngx-toolkit.svg?branch=master)](https://travis-ci.org/dewizz/ngx-toolkit) 
[![Coverage](https://coveralls.io/repos/github/dewizz/ngx-toolkit/badge.svg?branch=master#5)](https://coveralls.io/github/dewizz/ngx-toolkit?branch=master)
[![Join the chat at https://gitter.im/ngx-toolkit/Lobby](https://badges.gitter.im/ngx-toolkit/Lobby.svg)](https://gitter.im/ngx-toolkit/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# @ngx-toolkit/cache

> Angular Cache implementation for Browser & Server platforms.

# Table of contents:
* [Installation](#installation)
* [Annotations](#annotations)
* [Cache](#cache)
  * [MemoryCache](#memorycache)
  * [StorageCache](#storagecache)
  * [NoOpCache](#noopcache)
* [Custom Implementation](#custom-implementation)
* [License](#license)

---

# Installation

Install the npm package.

```bash
# To get the latest stable version and update package.json file:
npm install @ngx-toolkit/cache --save
# or
yarn add @ngx-toolkit/cache
```

Registered `CacheModule` in the root Module of your application with `forRoot(caches: Cache[])` static method.

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CacheModule, MemoryCache } from '@ngx-toolkit/cache';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, CacheModule.forRoot([
    new MemoryCache('myMemoryCache')
  ]) ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
----

# Annotations

## CacheDefaults
````typescript
/**
 * Allows the configuration of defaults for `CacheResult`, `CachePut`, `CacheRemove`, and `CacheRemoveAll` at the class level.
 * Without the method level annotations this annotation has no effect.
 * @param cacheName
 */
@CacheDefaults(cacheName: string)
````

## CacheResult
````typescript
/**
 * When a method annotated with `CacheResult` is invoked a cache key will be generated
 * and *Cache.get(key)* is called before the annotated method actually executes.
 * If a value is found in the cache it is returned and the annotated method is never actually executed.
 * If no value is found the annotated method is invoked and the returned value is stored in the cache with the generated key.
 *
 * @param params (Optional) {cacheName?: string}
 */
@CacheResult(params?: { cacheName?: string })
````

## CachePut
````typescript
/**
 * When a method annotated with `CachePut` is invoked a cache key will be generated
 * and *Cache.put(key, value)* will be invoked on the specified cache storing the value marked with `CacheValue`.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
@CachePut(params?: {cacheName?: string, afterInvocation: boolean = true})
````

## CacheKey
````typescript
/**
 * Marks a method argument as part of the cache key.
 * If no arguments are marked all arguments are used.
 * The exception is for a method annotated with `CachePut` where the `CacheValue` parameter is never included in the key.
 */
@CacheKey()
````

## CacheValue
````typescript
/**
 * Marks the parameter to be cached for a method annotated with `CachePut`.
 */
@CacheValue()
````

## CacheRemove
````typescript
/**
 * When a method annotated with `CacheRemove` is invoked a cache key will be generated
 * and *Cache.remove(key)* will be invoked on the specified cache.
 * The default behavior is to call *Cache.evict(key)* after the annotated method is invoked,
 * this behavior can be changed by setting *`afterInvocation`* to false in which case *Cache.evict(key)*
 * will be called before the annotated method is invoked.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
@CacheRemove(params?: {cacheName?: string, afterInvocation: boolean = true})
````

## CacheRemoveAll
````typescript
/**
 * When a method annotated with `CacheRemoveAll` is invoked all elements in the specified cache will be removed via the *Cache.clear()* method.
 * The default behavior is to call *Cache.clear()* after the annotated method is invoked,
 * this behavior can be changed by setting *`afterInvocation`* to false in which case *Cache.clear()* will be called before the annotated method is invoked.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
@CacheRemoveAll(params?: {cacheName?: string, afterInvocation: boolean = true})
````

Example:
````typescript
@CacheDefaults('myCacheBean')
class CacheBean {

  @CachePut()
  myMethod(@CacheKey() id: number, @CacheValue() value: any): void {
    ...
  }

  @CacheResult()
  get(id: number): any {
    ...
  }

  @CacheRemove()
  refresh(id: number): void {
    ...
  }

  @CacheRemoveAll()
  refreshAll(): void {
    ...
  }
}
````

# Cache

## MemoryCache

Cache in memory

```typescript
import { MemoryCache } from '@ngx-toolkit/cache';
new MemoryCache('myCacheName');
```

## StorageCache

Cache in a storage

```typescript
import { StorageCache } from '@ngx-toolkit/cache';
new StorageCache('myCacheName', window.sessionStorage || window.localStorage);
```

## NoOpCache

*No cache, do nothing...*

```typescript
import { NoOpCache } from '@ngx-toolkit/cache';
new NoOpCache('myCacheName');
```


# Custom implementation

You can create your own implementation. You simply need to implement the `Cache` interface:

```typescript
export interface Cache {

  /**
   * Return the cache name.
   */
  readonly name: string;

  /**
   * Return the value to which this cache maps the specified key
   */
  get<T>(key: string): T;

  /**
   * Associate the specified value with the specified key in this cache.
   * If the cache previously contained a mapping for this key, the old
   * value is replaced by the specified value.
   */
  put<T>(key: string, value: T): void;

  /**
   * Evict the mapping for this key from this cache if it is present.
   */
  evict(key: string): void;

  /**
   * Remove all mappings from the cache.
   */
  clear(): void;
}

```

# License
© 2018 Dewizz

[MIT](https://github.com/dewizz/ngx-toolkit/blob/master/LICENSE)
