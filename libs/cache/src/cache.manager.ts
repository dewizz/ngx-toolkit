import { Cache } from './cache.model';

class CacheManager {

  cache: Map<string, Cache<any, any>>;

  constructor() {
    this.cache = new Map<string, Cache<any, any>>();
  }

}


export const CACHES: Map<string, Cache<any, any>> = new Map<string, Cache<any, any>>();
