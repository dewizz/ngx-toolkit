import { CookieService } from '../cookie.service';
import { BrowserCookieService } from './browser-cookie.service';

describe('BrowserCookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    service = new BrowserCookieService(null, document);
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
  });
});
