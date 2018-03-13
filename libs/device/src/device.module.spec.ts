import { TestBed } from '@angular/core/testing';
import { DeviceModule } from './device.module';
import { Device, DevicePlatform } from './device.model';
import { DEVICE, USER_AGENT } from './device.token';

describe('DeviceModule', () => {
  it('should work', () => {
    expect(new DeviceModule()).toBeDefined();
  });

  it('should has a device', () => {
    TestBed.configureTestingModule({ imports: [DeviceModule.forRoot()] });

    const device: Device = TestBed.get(DEVICE);
    expect(device).toBeDefined();
  });

  it('should has a device with specific UserAgent', () => {
    TestBed.configureTestingModule({
      imports: [DeviceModule.forRoot()],
      providers: [
        {
          provide: USER_AGENT,
          useValue:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 Twitter for iPhone'
        }
      ]
    });

    const device: Device = TestBed.get(DEVICE);
    expect(device).toBeDefined();
    expect(device.isMobile()).toBeTruthy();
    expect(device.platform).toBe(DevicePlatform.IOS);
  });
});
