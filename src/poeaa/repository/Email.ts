export class Email {
  private _value: string = "";

  constructor(value: string) {
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    value = value.toLocaleLowerCase();
    if (!value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))
      throw new Error("Email invalid");
    this._value = value;
  }
}
