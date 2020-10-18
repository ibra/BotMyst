class Iterator {
  constructor(obj) {
    this.obj = obj;
    return this;
  }

  $(key, returnValue = false) {
    if (Iterator.isArray(this.obj) || Iterator.isObject(this.obj)) {
      const value = Iterator.hasKey(this.obj, key) ? this.obj[key] : undefined;
      const object = new Iterator(value);
      return returnValue ? object.value() : object;
    }
    const value = undefined;
    const object = new Iterator(value);
    return returnValue ? object.value() : object;
  }

  _(key, returnValue = false) {
    return this.$(key, returnValue);
  }

  static $$(obj) {
    const i = new Iterator(obj);
    return i;
  }

  keys() {
    if (Iterator.isArray(this.obj)) {
      if (this.obj.length > 0 && Iterator.isObject(this.obj[0])) {
        const keys = [];
        for (let i = 0; i < this.obj.length; i += 1) {
          const item = this.obj[i];
          keys.push(...Object.keys(item));
        }
        return keys;
      }
      return this.obj;
    }
    if (Iterator.isObject(this.obj)) {
      return Object.keys(this.obj);
    }
    return [];
  }

  // eslint-disable-next-line no-underscore-dangle
  static _keys(obj) {
    const i = new Iterator(obj);
    return i.keys();
  }

  string() {
    return Iterator.isString(this.obj) ? this.obj.toString() : "";
  }

  // eslint-disable-next-line no-underscore-dangle
  static _str(obj) {
    const i = new Iterator(obj);
    return i.string();
  }

  value() {
    return this.obj;
  }

  length() {
    if (Iterator.isArray(this.obj)) {
      return this.obj.length;
    }
    if (Iterator.isObject(this.obj)) {
      return this.keys().length;
    }
    return 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  static _len(obj) {
    const i = new Iterator(obj);
    return i.length();
  }

  static isArray(obj) {
    return Array.isArray(obj);
  }

  static isObject(obj) {
    return typeof obj === "object" && !Iterator.isArray(obj) && obj !== null;
  }

  static isNumber(obj) {
    return typeof obj === "number";
  }

  static isString(obj) {
    return typeof obj === "string";
  }

  static isBoolean(obj) {
    return typeof obj === "boolean";
  }

  static isNull(obj) {
    return obj === null;
  }

  static isUndefined(obj) {
    return obj === undefined;
  }

  static hasKey(obj, key) {
    if (Iterator.isArray(obj)) {
      return Iterator.isNumber(key) && obj.length > key;
    }
    if (Iterator.isObject(obj)) {
      const keys = Object.keys(obj);
      return keys.includes(key);
    }
    return false;
  }
}

module.exports = Iterator;
