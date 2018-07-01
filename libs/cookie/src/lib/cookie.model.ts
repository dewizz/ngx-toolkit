export class CookieOptions {
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
