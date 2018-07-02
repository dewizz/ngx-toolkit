import { Device, DevicePlatform, DeviceType } from './device.model';

/**
 * see https://github.com/spring-projects/spring-mobile
 */
export class DeviceService {
  private static KNOWN_MOBILE_USER_AGENT_PREFIXES: string[] = [
    'w3c ',
    'w3c-',
    'acs-',
    'alav',
    'alca',
    'amoi',
    'avan',
    'benq',
    'bird',
    'blac',
    'blaz',
    'brew',
    'cell',
    'cldc',
    'cmd-',
    'dang',
    'doco',
    'eric',
    'hipt',
    'htc_',
    'inno',
    'ipaq',
    'ipod',
    'jigs',
    'kddi',
    'keji',
    'leno',
    'lg-c',
    'lg-d',
    'lg-g',
    'lge-',
    'lg/u',
    'maui',
    'maxo',
    'midp',
    'mits',
    'mmef',
    'mobi',
    'mot-',
    'moto',
    'mwbp',
    'nec-',
    'newt',
    'noki',
    'palm',
    'pana',
    'pant',
    'phil',
    'play',
    'port',
    'prox',
    'qwap',
    'sage',
    'sams',
    'sany',
    'sch-',
    'sec-',
    'send',
    'seri',
    'sgh-',
    'shar',
    'sie-',
    'siem',
    'smal',
    'smar',
    'sony',
    'sph-',
    'symb',
    't-mo',
    'teli',
    'tim-',
    'tosh',
    'tsm-',
    'upg1',
    'upsi',
    'vk-v',
    'voda',
    'wap-',
    'wapa',
    'wapi',
    'wapp',
    'wapr',
    'webc',
    'winw',
    'winw',
    'xda ',
    'xda-'
  ];

  private static KNOWN_MOBILE_USER_AGENT_KEYWORDS: string[] = [
    'blackberry',
    'webos',
    'ipod',
    'lge vx',
    'midp',
    'maemo',
    'mmp',
    'mobile',
    'netfront',
    'hiptop',
    'nintendo DS',
    'novarra',
    'openweb',
    'opera mobi',
    'opera mini',
    'palm',
    'psp',
    'phone',
    'smartphone',
    'symbian',
    'up.browser',
    'up.link',
    'wap',
    'windows ce'
  ];

  private static KNOWN_TABLET_USER_AGENT_KEYWORDS: string[] = ['ipad', 'playbook', 'hp-tablet', 'kindle'];

  static resolveDevice(userAgent: string): Device {
    if (!userAgent) {
      return new Device(DeviceType.NORMAL, DevicePlatform.UNKNOWN);
    }

    userAgent = userAgent.toLowerCase();

    /**
     * Tablet Detection
     */

    // Apple
    if (userAgent.includes('ipad')) {
      return new Device(DeviceType.TABLET, DevicePlatform.IOS);
    }

    const isMobile: boolean =
      userAgent.includes('mobile') ||
      DeviceService.KNOWN_MOBILE_USER_AGENT_KEYWORDS.some(mobileUserAgent => userAgent.includes(mobileUserAgent));
    if (!isMobile) {
      // Android
      if (userAgent.includes('android')) {
        return new Device(DeviceType.TABLET, DevicePlatform.ANDROID);
      }
      // Kindle Fire
      if (userAgent.includes('silk')) {
        return new Device(DeviceType.TABLET, DevicePlatform.UNKNOWN);
      }
    }
    // From keywords
    if (DeviceService.KNOWN_TABLET_USER_AGENT_KEYWORDS.some(tabletUserAgent => userAgent.includes(tabletUserAgent))) {
      return new Device(DeviceType.TABLET, DevicePlatform.UNKNOWN);
    }

    /**
     * Mobile detection
     */
    // From prefix
    if (
      userAgent.length >= 4 &&
      DeviceService.KNOWN_MOBILE_USER_AGENT_PREFIXES.indexOf(userAgent.substring(0, 4)) !== -1
    ) {
      return new Device(DeviceType.MOBILE, DevicePlatform.UNKNOWN);
    }
    // Android
    if (userAgent.includes('android')) {
      return new Device(DeviceType.MOBILE, DevicePlatform.ANDROID);
    }
    // Apple
    if (userAgent.includes('iphone') || userAgent.includes('ipod') || userAgent.includes('ipad')) {
      return new Device(DeviceType.MOBILE, DevicePlatform.IOS);
    }
    // From keywords
    if (isMobile) {
      return new Device(DeviceType.MOBILE, DevicePlatform.UNKNOWN);
    }

    /**
     * => Normal device
     */
    return new Device(DeviceType.NORMAL, DevicePlatform.UNKNOWN);
  }
}
