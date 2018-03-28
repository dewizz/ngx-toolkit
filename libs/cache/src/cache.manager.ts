class CacheManager {

  cache: Map<string, Cache>;

  constructor() {
    this.cache = new Map<string, Cache>();
  }



}


export const CACHES: Map<string, Cache> = new Map<string, Cache>();
