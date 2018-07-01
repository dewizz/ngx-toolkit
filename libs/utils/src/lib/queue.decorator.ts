import {Deferred, isPromise} from './functions';
import {Subscription} from 'rxjs';

export interface QueueData {
  queue: Function[];
  promise: Promise<any>;
}

/**
 * Put the method call in a queue and wait for a Promise / Subscription / method execution
 * /!\ the method result is modified => Return a Promise
 */
export function Queue(limit?: number, name?: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> | void {
    // Init
    name = name || propertyKey.toString();
    const data: QueueData = (target[`_ngxQueue_${name}`] = target[`_ngxQueue_${name}`] || {
      queue: [],
      promise: Promise.resolve()
    });
    const originalMethod = descriptor.value;

    // Change method
    descriptor.value = function (...args: any[]) {
      // Push Future call
      const deferred: Deferred<any> = new Deferred<any>();

      // Ignore next call
      if (limit && data.queue.length >= limit) {
        deferred.reject('Queue is full');
      } else {
        data.queue.push(() => {
          try {
            const result: any = originalMethod.apply(this, args);

            if (isPromise(result)) {
              result.then(r => deferred.resolve(r), e => deferred.reject(e));
            } else if (result instanceof Subscription) {
              result.add(() => deferred.resolve());
            } else {
              deferred.resolve(result);
            }
          } catch (e) {
            deferred.reject(e);
          }

          return deferred.promise;
        });

        // Queue
        data.promise = data.promise
        // Call
          .then(() => data.queue[0].apply(this))
          // Pop
          .then(() => data.queue.pop(), () => data.queue.pop());
      }

      // Return promise
      return deferred.promise;
    };

    return descriptor;
  };
}
