import { randomUUID } from "crypto";
import { Prototype } from "./Prototype";

export class Field implements Prototype {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly title: string
  ) {}

  static create = (type: string, title: string) =>
    new Field(randomUUID(), type, title);

  clone() {
    return new Field(this.id, this.type, this.title);
  }
}
