export default class BaseEntity {
  constructor() {}

  [key: string]: any;

  toJSON() {
    let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    let json: { [key: string]: any } = {};

    props.forEach((prop) => {
      if (prop !== "constructor") json[prop] = this[prop];
    });

    return json;
  }
}
