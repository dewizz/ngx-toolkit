import {Cache} from '../cache.model';

export class NoOpCache implements Cache {

  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  clear(): void {
  }

  evict(key: string): void {
  }

  get<T>(key: string): T {
    return undefined;
  }

  put<T>(key: string, value: T): void {
  }
}
