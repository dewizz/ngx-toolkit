import {Reflect} from 'reflect-metadata/Reflect';
import { Cache } from './cache.model';
import {CACHES} from "./cache.manager";

export const METADATA_KEY_CACHE_DEFAUTLS = '_cache_defaults';
export const METADATA_KEY_CACHE_KEYS = '_cache_keys';
export const METADATA_KEY_CACHE_VALUE = '_cache_value';

export function CacheDefaults(cacheName: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): TFunction | void => {
    Reflect.defineMetadata(METADATA_KEY_CACHE_DEFAUTLS, cacheName, target);
    return;
  }
}

export function CacheResult(cacheName: string = ''): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
    return;
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
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
    return;
  }
}

export function CacheValue(): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata(`${METADATA_KEY_CACHE_VALUE}_${propertyKey}`, parameterIndex, target, propertyKey);
  }
}

export function CacheRemove(cacheName: string = ''): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
    return;
  }
}

export function CacheRemoveAll(cacheName: string = ''): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache: Cache = getCache(target, cacheName);
      const result: any = originalMethod.apply(this, args);

      if (cache) {
        cache.removeAll();
      }

      return result;
    };
    return descriptor;
  }
}

export function getCache(target: Object, cacheName: string = ''): Cache {
  if(cacheName === '') {
    cacheName = Reflect.getMetadata(METADATA_KEY_CACHE_DEFAUTLS, target) || '';
  }
  return CACHES.get(cacheName);
}

export function getCacheKey(): string {
  Reflect.getMetadata(`${METADATA_KEY_CACHE_KEYS}_${propertyKey}`, target, propertyKey);
}
