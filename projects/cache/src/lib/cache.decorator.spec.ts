import {CacheDefaults, CacheKey, CachePut, CacheRemove, CacheRemoveAll, CacheResult, CacheValue} from './cache.decorator';
import {initCacheManager} from './cache.instance';
import {MemoryCache} from './impl/memory-cache';
import {StorageCache} from './impl/storage-cache';
import {SimpleCacheManager} from './simple-cache.manager';

@CacheDefaults('cacheBean')
class CacheBean {

  @CachePut()
  put(@CacheKey() id: number, @CacheValue() value: any): void {
  }

  @CacheResult()
  get(id: number): any {
    return null;
  }

  @CacheRemove()
  clear(id: number): void {
  }

  @CacheRemoveAll()
  clearAll(): void {
  }
}

describe('CacheDecorator', () => {

  beforeEach(() => {

  });

  it('should throw an error if no cacheManager declared', () => {
    const bean: CacheBean = new CacheBean();

    expect(function() {
      bean.put(1, 2);
    }).toThrowError();
  });

  it('should throw an error if no cache declared', () => {
    const bean: CacheBean = new CacheBean();

    initCacheManager(new SimpleCacheManager());
    expect(function() {
      bean.put(1, 2);
    }).toThrowError();
  });

  it('should not has an injector', () => {
    const bean: CacheBean = new CacheBean();

    [new MemoryCache('cacheBean'), new StorageCache('cacheBean', localStorage)].forEach(cache => {
      const cacheManager: SimpleCacheManager = new SimpleCacheManager();
      cacheManager.addCache(cache);
      initCacheManager(cacheManager);


      bean.put(1, 'put');
      bean.put(2, 'put2');

      expect(bean.get(2)).toBe('put2');

      expect(bean.get(3)).toBeNull();

      bean.clear(2);
      expect(bean.get(2)).toBeNull();

      expect(bean.get(1)).toBe('put');

      bean.clearAll();
      expect(bean.get(1)).toBeNull();
    });
  });
});
