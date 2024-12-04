import BaseEntity from "./baseEntity";

interface IRoomEntity {
  id?: number;
  name?: string;
  ownerId?: number;
}

export default class RoomEntity extends BaseEntity {
  #id?: number;
  #name?: string;
  #ownerId?: number;

  constructor({ id, name, ownerId }: IRoomEntity = {}) {
    super();
    this.#id = id;
    this.#name = name;
    this.#ownerId = ownerId;
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

  get ownerId(): number | undefined {
    return this.#ownerId;
  }

  set ownerId(value: number | undefined) {
    this.#ownerId = value;
  }
}
