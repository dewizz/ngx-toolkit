import {Once} from './once.decorator';

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
