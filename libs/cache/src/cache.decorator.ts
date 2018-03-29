import 'reflect-metadata/Reflect';
import {Cache} from './cache.model';
import {CACHES} from "./cache.manager";

export const METADATA_KEY_CACHE_DEFAULTS = '_cache_defaults';
export const METADATA_KEY_CACHE_KEYS = '_cache_keys';
export const METADATA_KEY_CACHE_VALUE = '_cache_value';

export function CacheDefaults(cacheName: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): TFunction | void => {
    Reflect.defineMetadata(METADATA_KEY_CACHE_DEFAULTS, cacheName, target);
    return;
  }
}

export function CacheResult(cacheName: string = ''): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache<any, any> = getCache(target, cacheName);
      const cacheKey: string = getCacheKey(target, propertyKey, args);

      // Find cache value
      let result: any = cache.get(cacheKey);

      // Call function & save function if no cache value
      if(result === undefined) {
        // Call function & save result
        result = originalMethod.apply(this, args);
        cache.put(cacheKey, result);
      }

      return result;
    };
    return descriptor;
  }
}

export function CacheKey(): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    const indices = Reflect.getMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, target, propertyKey) || [];
    indices.push(parameterIndex);
    Reflect.defineMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, indices, target, propertyKey);
  }
}

export function CachePut(cacheName: string = ''): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache<any, any> = getCache(target, cacheName);
      const cacheKey: string = getCacheKey(target, propertyKey, args);
      const indexValue: number = Reflect.getMetadata(`${METADATA_KEY_CACHE_VALUE}_${propertyKey}`, target, propertyKey);

      if(indexValue && indexValue >= 0 && indexValue < args.length) {
        cache.put(cacheKey, args[indexValue]);
      }

      return originalMethod.apply(this, args);
    };
    return descriptor;
  }
}

export function CacheValue(): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata(`${METADATA_KEY_CACHE_VALUE}_${propertyKey}`, parameterIndex, target, propertyKey);
  }
}

export function CacheRemove(cacheName: string = ''): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache<any, any> = getCache(target, cacheName);
      const cacheKey: string = getCacheKey(target, propertyKey, args);

      const result: any =  originalMethod.apply(this, args);
      cache.remove(cacheKey);

      return result;
    };
    return descriptor;
  }
}

export function CacheRemoveAll(cacheName: string = ''): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache<any, any> = getCache(target, cacheName);
      const result: any = originalMethod.apply(this, args);

      cache.removeAll();

      return result;
    };
    return descriptor;
  }
}

export function getCache(target: Object, cacheName: string = ''): Cache<any, any> {
  if (cacheName === '') {
    cacheName = Reflect.getMetadata(METADATA_KEY_CACHE_DEFAULTS, target) || '';
  }
  const cache: Cache<any, any> = CACHES.get(cacheName);
  if(!cache) {
    throw new Error(`Cache '${cacheName}' not found`);
  }

  return cache;
}

export function getCacheKey(target: Object, propertyKey: string | symbol, ...args: any[]): string {
  const indices: number[] = Reflect.getMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, target, propertyKey);
  if (indices) {
    args = args.filter((value: any, index: number) => indices.indexOf(index) !== -1);
  }

  return args.map(a => (JSON.stringify(a) || a.toString())).join('|');
}
