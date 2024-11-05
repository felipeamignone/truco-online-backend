import BaseEntity from "./baseEntity";

interface IUserEntity {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export default class UserEntity extends BaseEntity {
  #id?: number;
  #name?: string;
  #email?: string;
  #password?: string;

  constructor({ id, name, email, password }: IUserEntity = {}) {
    super();
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
  }

  get id(): number | undefined {
    return this.#id;
  }

  set id(value: number | undefined) {
    this.#id = value;
  }

  get name(): string | undefined {
    return this.#name;
  }

  set name(value: string | undefined) {
    this.#name = value;
  }

  get email(): string | undefined {
    return this.#email;
  }

  set email(value: string | undefined) {
    this.#email = value;
  }

  get password(): string | undefined {
    return this.#password;
  }

  set password(value: string | undefined) {
    this.#password = value;
  }
}
