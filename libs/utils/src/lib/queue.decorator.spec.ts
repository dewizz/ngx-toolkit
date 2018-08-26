import {Queue} from './queue.decorator';
import {Observable, Subscription, throwError, timer} from 'rxjs';
import {concatMap, delay, tap} from 'rxjs/operators';

const WAIT_TIME = 50;
const QUEUE_NUMBER = 2;

class ClassTest {
  incr = 0;

  get waitObs(): Observable<any> {
    return timer(WAIT_TIME);
  }

  @Queue(QUEUE_NUMBER)
  obsSuccessFunc(incr = 1): Subscription {
    return this.waitObs
      .subscribe(() => this.plus(incr));
  }

  @Queue(QUEUE_NUMBER)
  obsErrorFunc(incr = 1): Subscription {
    return this.waitObs.pipe(
      concatMap(() => throwError('error'))
    )
      .subscribe(() => {
      }, () => this.plus(incr));
  }

  @Queue(QUEUE_NUMBER)
  promiseSuccessFunc(incr = 1): Promise<any> {
    return this.waitObs.toPromise().then(() => this.plus(incr));
  }

  @Queue(QUEUE_NUMBER)
  promiseErrorFunc(incr = 1): Promise<any> {
    return this.promiseSuccessFunc().then(() => {
      throw new Error('error');
    });
  }

  @Queue(QUEUE_NUMBER)
  classicSuccessFunc(incr = 1): number {
    return this.plus(incr);
  }

  @Queue(QUEUE_NUMBER)
  classicErrorFunc(incr = 1): void {
    this.plus(incr);
    throw new Error('error');
  }

  private plus(n: number): number {
    this.incr += n;
    return this.incr;
  }
}

function testIt(classTest: ClassTest, fn: Function, done: DoneFn, firstPassValue: number = 2, secondPassValue: number = 3) {
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

describe('QueueDecorator', () => {
  let klass: ClassTest;

  beforeEach(() => {
    klass = new ClassTest();
  });

  it('should works with observable success', (done: DoneFn) => {
    testIt(klass, klass.obsSuccessFunc, done);
  });
  it('should works with observable error', (done: DoneFn) => {
    testIt(klass, klass.obsErrorFunc, done);
  });
  it('should works with promise success', (done: DoneFn) => {
    testIt(klass, klass.promiseSuccessFunc, done);
  });
  it('should works with promise error', (done: DoneFn) => {
    testIt(klass, klass.promiseErrorFunc, done);
  });
  it('should works with function success', (done: DoneFn) => {
    testIt(klass, klass.classicSuccessFunc, done, 3, 4);
  });
  it('should works with function error', (done: DoneFn) => {
    testIt(klass, klass.classicErrorFunc, done, 3, 4);
  });
});
