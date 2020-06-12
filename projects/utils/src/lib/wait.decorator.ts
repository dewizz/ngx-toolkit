import {Subscription} from 'rxjs';
import {Deferred, isPromise} from './functions';

export interface WaitData {
  wait?: Function;
  promise: Promise<any>;
}

/**
 * Wait for a Promise / Subscription before to be re-executed
 * /!\ the method result is modified => Return a Promise
 */
export function Wait(name?: string): MethodDecorator {
  return function(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> | void {
    // Init
    name = name || propertyKey.toString();
    const data: WaitData = (target[`_ngxWait_${name}`] = target[`_ngxWait_${name}`] || {
      promise: Promise.resolve()
    });
    const originalMethod = descriptor.value;

    // Change method
    descriptor.value = function(...args: any[]) {
      // Push Future call
      const deferred: Deferred<any> = new Deferred<any>();

      // Ignore next call
      if (!data.wait) {
        data.wait = () => {
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
        };

        // Execute
        data.promise = data.promise

          // Call
          .then(() => data.wait.apply(this))
          // Pop
          .then(() => data.wait = null, () => data.wait = null);
      } else {
        deferred.reject('Wait: Function is running');
      }

      // Return promise
      return deferred.promise;
    };

    return descriptor;
  };
}

