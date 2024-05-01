export class Password {
  private _value: string = "";

  constructor(value: string) {
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    if (value.length < 8)
      throw new Error("Password must have at least 8 characters");
    this._value = value;
  }
}
