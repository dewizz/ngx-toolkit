import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {initCacheManager} from './cache.instance';
import {SimpleCacheManager} from './simple-cache.manager';
import {Cache} from './cache.model';

@NgModule({
  imports: [CommonModule]
})
export class CacheModule {
  /**
   * In root module to provide caches
   */
  static forRoot(caches: Cache[]): ModuleWithProviders {
    initCacheManager(new SimpleCacheManager(caches));

    return {
      ngModule: CacheModule
    };
  }
}
