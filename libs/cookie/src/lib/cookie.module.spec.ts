import {ApplicationInitStatus} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {CookieModule} from './cookie.module';
import {COOKIE_DECORATOR_DATA} from './cookie.decorator';

describe('CookieModule', () => {
  it('should work', () => {
    expect(new CookieModule()).toBeDefined();
  });

  it('should configure COOKIE_DECORATOR_DATA', async (done: DoneFn) => {
    await TestBed.configureTestingModule({
      imports: [CookieModule.forRoot()]
    })
    // https://github.com/angular/angular/issues/24218
      .get(ApplicationInitStatus).donePromise;

    expect(COOKIE_DECORATOR_DATA.cookieService).toBeDefined();
    done();
  });
});
