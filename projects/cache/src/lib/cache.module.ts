import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {initCacheManager} from './cache.instance';
import {Cache} from './cache.model';
import {SimpleCacheManager} from './simple-cache.manager';

@NgModule({
  imports: [CommonModule]
})
export class CacheModule {
  /**
   * In root module to provide caches
   */
  static forRoot(caches: Cache[]): ModuleWithProviders<CacheModule> {
    initCacheManager(new SimpleCacheManager(caches));

    return {
      ngModule: CacheModule
    };
  }
}
