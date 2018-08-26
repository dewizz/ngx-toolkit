import {CacheManager} from './cache.manager';

const CACHE_INSTANCE = {
  manager: undefined
};


export function initCacheManager(cacheManager: CacheManager) {
  CACHE_INSTANCE.manager = cacheManager;
}

export function getCacheManager(): CacheManager {
  if (!CACHE_INSTANCE.manager) {
    throw new Error('No cache found, `initCacheManager` before');
  }
  return CACHE_INSTANCE.manager;
}
