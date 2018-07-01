import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatMap';
import {Once} from "@ngx-toolkit/utils";

describe('OnceDecorator', () => {
  it('should executed once', () => {
    class Test {
      called = 0;

      @Once('name')
      func1() {
        this.called++;
      }

      @Once('name')
      func2() {
        this.called++;
      }
    }

    const test: Test = new Test();

    test.func1();
    test.func1();
    test.func2();

    expect(test.called).toEqual(1);
  });
});
