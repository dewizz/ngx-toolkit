import {Observable, Subscription, timer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {Wait} from './wait.decorator';

const WAIT_TIME = 50;

class ClassTest {
  incr = 0;

  get waitObs(): Observable<any> {
    return timer(WAIT_TIME);
  }

  @Wait()
  obsSuccessFunc(incr = 1): Subscription {
    return this.waitObs
      .subscribe(() => this.plus(incr));
  }

  private plus(n: number): number {
    this.incr += n;
    return this.incr;
  }
}

function testIt(classTest: ClassTest, fn: Function, done: DoneFn, firstPassValue: number = 3, secondPassValue: number = 4) {
  fn.apply(classTest);

  timer(WAIT_TIME / 2).subscribe(() => {
    fn.apply(classTest);
    fn.apply(classTest);
  });

  timer(WAIT_TIME * 2.1).pipe(
    tap(() => {
      expect(classTest.incr).toEqual(firstPassValue);

      fn.apply(classTest);
    }),
    delay(WAIT_TIME * 1.1)
  )
    .subscribe(() => {
      expect(classTest.incr).toEqual(secondPassValue);
      done();
    });
}

describe('WaitDecorator', () => {
  let klass: ClassTest;

  beforeEach(() => {
    klass = new ClassTest();
  });

  it('should works with observable success', (done: DoneFn) => {
    testIt(klass, klass.obsSuccessFunc, done);
  });
});
