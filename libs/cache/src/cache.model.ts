// export namespace Cache {
//
//   export class Entry {
//
//   }
//
//
// }

export interface Cache<K, V> {

  /**
   * @param {K} key
   * @return true if the Cache contains an entry for the specified key.
   */
  containsKey(key: K): boolean;

  /**
   * Gets an entry from the cache.
   * @param {K} key
   * @return {V} value
   */
  get(key: K): V;

  /**
   *
   * @param {Set<K>} keys
   * @return {Map<K, V>}
   */
  getAll(keys: Set<K>): Map<K,V>;

  /**
   * Return the name of the cache.
   * @return {string}
   */
  getName(): string;

  /**
   * Associates the specified value with the specified key in the cache.
   * @param {K} key
   * @param {V} value
   */
  put(key: K, value: V): void;

//   void	putAll(Map<? extends K,? extends V> map)
// Copies all of the entries from the specified map to the Cache.

  /**
   * Atomically associates the specified key with the given value if it is not already associated with a value.
   * @param {K} key
   * @param {V} value
   * @return {boolean}
   */
  putIfAbsent(key: K, value: V): boolean;

  /**
   * Removes the mapping for a key from this cache if it is present.
   * @param {K} key
   * @return {boolean}
   */
  remove(key: K): boolean;

  removeAll(): void;
}
