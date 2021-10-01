export default class DataStorage {
  constructor(storage, ERROR_MESSAGES) {
    this._storage = storage;
    this._errors = ERROR_MESSAGES;
  }

  clear() {
    try {
      this._storage.clear();
    }
    catch (error) {
      console.log(error)
      alert(this._errors.storageError);
    }

  }

  set(key, value) {
    try {
      this._storage.setItem(key, value);
    }
    catch (error) {
      console.log(error)
    }
  }

  getObject(key) {
    try {
      return JSON.parse(this._storage.getItem(key));
    }
    catch (error) {
      console.log(error)
    }

  }

  getString(key) {

    try {
      return this._storage.getItem(key);
    }
    catch (error) {
      console.log(error)
    }

  }

}
