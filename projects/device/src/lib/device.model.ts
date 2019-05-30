export enum DeviceType {
  TABLET = 0,
  MOBILE,
  NORMAL
}

export enum DevicePlatform {
  ANDROID = 0,
  IOS,
  UNKNOWN
}

export class Device {
  type: DeviceType;
  platform: DevicePlatform;

  constructor(type: DeviceType = DeviceType.NORMAL, platform: DevicePlatform = DevicePlatform.UNKNOWN) {
    this.type = type;
    this.platform = platform;
  }

  isNormal(): boolean {
    return this.type === DeviceType.NORMAL;
  }

  isMobile(): boolean {
    return this.type === DeviceType.MOBILE;
  }

  isTablet(): boolean {
    return this.type === DeviceType.TABLET;
  }
}
