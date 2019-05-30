import {Cache} from './cache.model';

export interface CacheManager {
  /**
   * Return the cache associated with the given name.
   */
  getCache(name: string): Cache;

  /**
   * Return a collection of the cache names known by this manager.
   */
  getCacheNames(): string[];
}
