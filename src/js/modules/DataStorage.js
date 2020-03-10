export default class DataStorage {
  constructor(storage) {
    this.storage = storage;
  }

  clear() {
    this.storage.clear()
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }

  getObject(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  getString(key) {

    return this.storage.getItem(key);
  }

}
