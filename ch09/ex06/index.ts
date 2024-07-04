// key: stringかnumberに強制する
export class TypedMap<K extends string | number, V> {
  #map: Map<K, V>;

  constructor(initialMap?: Map<K, V>) {
    this.#map = initialMap || new Map<K, V>();
  }

  set(key: K, value: V) {
    this.#map.set(key, value);
    return this; // for method chain. _map.set().set().set()...
  }

  get(key: K) {
    return this.#map.get(key);
  }
}
