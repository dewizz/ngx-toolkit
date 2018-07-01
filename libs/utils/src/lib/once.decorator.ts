/**
 * mark a method to be executed no more than once even if called several times
 * @param {string} name (default: method name)
 */
export function Once(name?: string): MethodDecorator {
  return function (target: Object,
                   propertyKey: string | symbol,
                   descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {

    // Init
    name = name || propertyKey.toString();
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!target[`_ngxQueue_${name}`]) {
        target[`_ngxQueue_${name}`] = true;
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
