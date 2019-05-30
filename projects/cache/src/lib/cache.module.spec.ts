import {TestBed} from '@angular/core/testing';
import {getCacheManager, initCacheManager} from './cache.instance';
import {CacheModule} from './cache.module';
import {MemoryCache} from './impl/memory-cache';

describe('CacheModule', () => {
  it('should work', () => {
    expect(new CacheModule()).toBeDefined();
  });

  it('should configure cacheManager', () => {
    initCacheManager(null);

    TestBed.configureTestingModule({
      imports: [CacheModule.forRoot([
        new MemoryCache('simpleCache')
      ])]
    });

    expect(getCacheManager()).toBeDefined();
    expect(getCacheManager().getCacheNames().length).toBe(1);
    expect(getCacheManager().getCacheNames()[0]).toBe('simpleCache');
  });
});
