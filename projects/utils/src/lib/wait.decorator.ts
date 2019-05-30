import {Queue} from './queue.decorator';

/**
 * Wait for a Promise / Subscription before to be re-executed
 * /!\ the method result is modified => Return a Promise
 */
export const Wait = (name?: string) => Queue.bind(this, 1, name);
