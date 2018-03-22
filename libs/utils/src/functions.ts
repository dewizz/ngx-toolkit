/**
 * Deferred
 */
export class Deferred<T> {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
  promise: Promise<T>;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    Object.freeze(<Deferred<any>>this);
  }
}
