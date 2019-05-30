import {CacheManager} from './cache.manager';
import {Cache} from './cache.model';

export class SimpleCacheManager implements CacheManager {
  private cacheMap: Map<string, Cache>;

  constructor(caches?: Cache[]) {
    this.setCaches(caches);
  }

  getCacheNames(): string[] {
    return Array.from(this.cacheMap.keys());
  }

  getCache(name: string): Cache {
    return this.cacheMap.get(name) || null;
  }

  addCache(cache: Cache): void {
    if (!cache) {
      throw new Error('Cache is undefined');
    }
    this.cacheMap.set(cache.name, cache);
  }

  setCaches(caches: Cache[]): void {
    this.cacheMap = new Map<string, Cache>();
    if (caches) {
      caches.forEach(cache => this.addCache(cache));
    }
  }
}
