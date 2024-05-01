export class Status {
  private _value: "active" | "blocked" = "active";

  constructor(value: "active" | "blocked" = "active") {
    this.value = value;
  }

  isBlocked() {
    return this._value === "blocked";
  }

  get value() {
    return this._value;
  }

  set value(value: "active" | "blocked") {
    if (value !== "active" && value !== "blocked")
      throw new Error("Status invalid");
    this._value = value;
  }
}
