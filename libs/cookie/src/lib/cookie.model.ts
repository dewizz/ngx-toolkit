export interface CookieOptions {
  /**
   * The path from where the cookie will be readable.
   */
  path?: string;
  /**
   * The domain from where the cookie will be readable.
   */
  domain?: string;
  /**
   * The expiration :
   *  - in seconds for the max-age
   *  - Infinity for a never expiration
   *  - Date in GMTString format
   *  - Date object
   *
   *  If not specified the cookie will expire at the end of the session.
   */
  expires?: Date | string | number;
  /**
   * If true, the cookie will be transmitted only over secure protocol as https.
   */
  secure?: boolean;
}

/**
 * Convert cookies string to object
 * @param cookiesStr
 */
export function cookiesStrToObj(cookiesStr: string): { [key in string]: string } {
  const cookies: { [key in string]: string } = {};
  if (!cookiesStr) {
    return cookies;
  }

  cookiesStr.split('; ').forEach(cookie => {
    const cookieSplited: string[] = cookie.split('=');
    cookies[decodeURIComponent(cookieSplited[0])] = decodeURIComponent(cookieSplited[1]);
  });
  return cookies;
}
