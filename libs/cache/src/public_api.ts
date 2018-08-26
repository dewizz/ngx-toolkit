/*
 * Public API Surface of cache
 */

export {CacheModule} from './lib/cache.module';
export {
  CacheDefaults, CacheResult, CacheKey, CacheValue, CachePut, CacheRemove, CacheRemoveAll
}from './lib/cache.decorator';
export {CacheManager} from './lib/cache.manager';
export {SimpleCacheManager} from './lib/simple-cache.manager';
export {getCacheManager, initCacheManager} from './lib/cache.instance';
export {Cache} from './lib/cache.model';
export {NoOpCache} from './lib/impl/no-op-cache';
export {StorageCache} from './lib/impl/storage-cache';
export {MemoryCache} from './lib/impl/memory-cache';
