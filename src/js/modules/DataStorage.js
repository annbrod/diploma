export default class DataStorage {
  constructor(storage, ERROR_MESSAGES) {
    this.storage = storage;
    this.errors = ERROR_MESSAGES;
  }

  clear() {
    try {
      this.storage.clear();
    }
    catch (error) {
      console.log(error)
      alert(this.errors.storageError);
    }

  }

  set(key, value) {
    try {
      this.storage.setItem(key, value);
    }
    catch (error) {
      console.log(error)
    }
  }

  getObject(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    }
    catch (error) {
      console.log(error)
    }

  }

  getString(key) {

    try {
      return this.storage.getItem(key);
    }
    catch (error) {
      console.log(error)
    }

  }

}
