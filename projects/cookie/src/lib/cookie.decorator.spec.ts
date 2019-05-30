import {Cookie, COOKIE_DECORATOR_DATA} from './cookie.decorator';
import {CookieService} from './cookie.service';
import {BrowserCookieFactory} from './browser';

describe('CookieDecorator', () => {
  beforeEach(() => {
    const service: CookieService = new CookieService(null, new BrowserCookieFactory(document));
    service.clear();

    COOKIE_DECORATOR_DATA.cookieService = service;
  });

  it('should not has an injector', () => {
    class Test {
      @Cookie() test: string;
    }

    const test: Test = new Test();
    expect(test.test).toBeNull();
    test.test = 'data';
    expect(test.test).toEqual('data');
  });
});
