import {CookieFactory, CookieService, DATE_MAX_EXPIRES} from './cookie.service';
import {BrowserCookieFactory} from './browser/browser-cookie.factory';

describe('CookieService', () => {
  let service: CookieService;
  let factory: CookieFactory;

  beforeEach(() => {
    factory = new BrowserCookieFactory(document);
    service = new CookieService(null, factory);
    service.clear();
  });

  it('#service is defined', () => {
    expect(service).toBeDefined();
    expect(service instanceof CookieService).toBeTruthy();
  });

  it('check unexist cookie', () => {
    const cookieKey = 'cookie_name';

    expect(service.hasItem(cookieKey)).toBeFalsy();
    expect(service.getItem(cookieKey)).toBeNull();
    expect(service.keys()).toEqual([]);
    expect(service.length).toBe(0);
  });

  it('#setItem should world :)', () => {
    const cookieKey = 'cookie_name';
    const cookieValue = 'cookie_value';

    service.setItem(null);

    service.setItem(cookieKey, cookieValue);
    expect(service.hasItem(cookieKey)).toBeTruthy();
    expect(service.getItem(cookieKey)).toBe(cookieValue);

    expect(service.keys()).toEqual([cookieKey]);
    expect(service.length).toBe(1);
  });

  it('check unexist cookie', () => {
    const cookieKey1 = 'cookie1';
    const cookieKey2 = 'cookie2';

    service.setItem(cookieKey1, cookieKey1);
    service.setItem(cookieKey2, cookieKey2);
    expect(service.keys()).toEqual([cookieKey1, cookieKey2]);
    expect(service.length).toBe(2);
    expect(service.key(1)).toEqual(cookieKey2);
    expect(service.key(2)).toEqual(null);
  });

  it('check default options', () => {
    spyOn(factory, 'save');

    service.setItem('test', 'test');
    expect(factory.save).toHaveBeenCalledWith('test', 'test', {path: '/', expires: DATE_MAX_EXPIRES});

    service.setItem('test', 'test', {path: '/toto'});
    expect(factory.save).toHaveBeenCalledWith('test', 'test', {path: '/toto', expires: DATE_MAX_EXPIRES});

    service.setItem('test', 'test', {path: '/toto', domain: 'dewizz.com'});
    expect(factory.save).toHaveBeenCalledWith('test', 'test', {
      path: '/toto',
      expires: DATE_MAX_EXPIRES,
      domain: 'dewizz.com'
    });
  });
});
