import 'reflect-metadata/Reflect';
import {Cache} from './cache.model';
import {getCacheManager} from './cache.instance';

export const METADATA_KEY_CACHE_DEFAULTS = '_cache_defaults';
export const METADATA_KEY_CACHE_KEYS = '_cache_keys';
export const METADATA_KEY_CACHE_VALUE = '_cache_value';

export interface CacheParams {
  cacheName?: string;
}

export interface CacheParamsInvoc extends CacheParams {
  afterInvocation?: boolean;
}

/**
 * Allows the configuration of defaults for `CacheResult`, `CachePut`, `CacheRemove`, and `CacheRemoveAll` at the class level.
 * Without the method level annotations this annotation has no effect.
 *
 * @param cacheName
 */
export function CacheDefaults(cacheName: string): ClassDecorator {
  return (target: Function): void => {
    Reflect.defineMetadata(METADATA_KEY_CACHE_DEFAULTS, cacheName, target);
  };
}

/**
 * When a method annotated with `CacheResult` is invoked a cache key will be generated
 * and *Cache.get(key)* is called before the annotated method actually executes.
 * If a value is found in the cache it is returned and the annotated method is never actually executed.
 * If no value is found the annotated method is invoked and the returned value is stored in the cache with the generated key.
 *
 * @param params (Optional) {cacheName?: string}
 */
export function CacheResult(params?: CacheParams): MethodDecorator {
  params = getDefaultParams<CacheParams>(params);

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache = getCache(target, params);
      const cacheKey: string = getCacheKey(target, propertyKey, args);

      // Find cache value
      let result: any = cache.get(cacheKey);

      // Call function & save function if no cache value
      if (result === undefined) {
        // Call function & save result
        result = originalMethod.apply(this, args);
        cache.put(cacheKey, result);
      }

      return result;
    };
    return descriptor;
  };
}

/**
 * Marks a method argument as part of the cache key.
 * If no arguments are marked all arguments are used.
 * The exception is for a method annotated with `CachePut` where the `CacheValue` parameter is never included in the key.
 */
export function CacheKey(): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    const indices = Reflect.getMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, target, propertyKey) || [];
    indices.push(parameterIndex);
    Reflect.defineMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, indices, target, propertyKey);
  };
}

/**
 * When a method annotated with `CachePut` is invoked a cache key will be generated
 * and *Cache.put(key, value)* will be invoked on the specified cache storing the value marked with `CacheValue`.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
export function CachePut(params?: CacheParamsInvoc): MethodDecorator {
  params = getDefaultParams<CacheParamsInvoc>(params);

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache = getCache(target, params);
      const indexValue: number = Reflect.getMetadata(`${METADATA_KEY_CACHE_VALUE}_${propertyKey}`, target, propertyKey);
      const cacheKey: string = getCacheKey(target, propertyKey, args, indexValue);

      if (!params.afterInvocation && indexValue && indexValue >= 0 && indexValue < args.length) {
        cache.put(cacheKey, args[indexValue]);
      }

      const result = originalMethod.apply(this, args);

      if (params.afterInvocation && indexValue && indexValue >= 0 && indexValue < args.length) {
        cache.put(cacheKey, args[indexValue]);
      }

      return result;
    };
    return descriptor;
  };
}

/**
 * Marks the parameter to be cached for a method annotated with `CachePut`.
 */
export function CacheValue(): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata(`${METADATA_KEY_CACHE_VALUE}_${propertyKey}`, parameterIndex, target, propertyKey);
  };
}

/**
 * When a method annotated with `CacheRemove` is invoked a cache key will be generated
 * and *Cache.remove(key)* will be invoked on the specified cache.
 * The default behavior is to call *Cache.evict(key)* after the annotated method is invoked,
 * this behavior can be changed by setting *`afterInvocation`* to false in which case *Cache.evict(key)*
 * will be called before the annotated method is invoked.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
export function CacheRemove(params?: CacheParamsInvoc): MethodDecorator {
  params = getDefaultParams<CacheParamsInvoc>(params);

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache = getCache(target, params);
      const cacheKey: string = getCacheKey(target, propertyKey, args);

      if (!params.afterInvocation) {
        cache.evict(cacheKey);
      }

      const result: any = originalMethod.apply(this, args);


      if (params.afterInvocation) {
        cache.evict(cacheKey);
      }

      return result;
    };
    return descriptor;
  };
}

/**
 * When a method annotated with `CacheRemoveAll` is invoked all elements in the specified cache will be removed via the *Cache.clear()* method.
 * The default behavior is to call *Cache.clear()* after the annotated method is invoked,
 * this behavior can be changed by setting *`afterInvocation`* to false in which case *Cache.clear()* will be called before the annotated method is invoked.
 *
 * @param params (Optional) {cacheName?: string, afterInvocation: boolean = true}
 */
export function CacheRemoveAll(params?: CacheParamsInvoc): MethodDecorator {
  params = getDefaultParams<CacheParamsInvoc>(params);

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache = getCache(target, params);
      if (!params.afterInvocation) {
        cache.clear();
      }

      const result: any = originalMethod.apply(this, args);

      if (params.afterInvocation) {
        cache.clear();
      }

      return result;
    };
    return descriptor;
  };
}

function getDefaultParams<T>(cacheParams: CacheParams): T {
  // @ts-ignore
  return Object.assign({
    afterInvocation: true
  }, cacheParams || {});
}

function getCache(target: Object, params: CacheParams): Cache {
  if (!params.cacheName) {
    params.cacheName = Reflect.getMetadata(METADATA_KEY_CACHE_DEFAULTS, target.constructor) || '';
  }

  const cache: Cache = getCacheManager().getCache(params.cacheName);
  if (!cache) {
    throw new Error(`Cache '${params.cacheName}' not found for ${target.constructor.name}`);
  }
  return cache;
}

function getCacheKey(target: Object, propertyKey: string | symbol, args: any[], cacheValueIndex: number = -1): string {
  if (!args) {
    args = [];
  }

  const indices: number[] = Reflect.getMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, target, propertyKey);
  if (indices) {
    args = args.filter((value: any, index: number) => indices.indexOf(index) !== -1 && cacheValueIndex !== index);
  } else if (cacheValueIndex !== -1) {
    args = args.filter((value: any, index: number) => cacheValueIndex !== index);
  }

  if (args.length === 0) {
    throw new Error(`Couldn't generate key without params for '${propertyKey}' method of ${target.constructor.name}`);
  }

  return args.map(a => (JSON.stringify(a) || a.toString())).join('|');
}
