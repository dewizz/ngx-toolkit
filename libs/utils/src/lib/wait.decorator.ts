import { Queue } from './queue.decorator';

/**
 * Wait for a Promise / Subscription before to be re-executed
 * /!\ the method result is modified => Return a Promise
 */
export function Wait(name?: string): MethodDecorator {
  return Queue(1, name);
}
