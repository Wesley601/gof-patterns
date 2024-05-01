import { Email } from "./repository/Email";
import { Password } from "./repository/Password";
import { Status } from "./repository/Status";

export class User {
  private _status: Status;
  private _password: Password;
  private _email: Email;

  constructor(
    private _id: string,
    email: string,
    password: string,
    status: "active" | "blocked" = "active"
  ) {
    this._password = new Password(password);
    this._email = new Email(email);
    this._status = new Status(status);
  }

  changePassword(password: string) {
    this._password = new Password(password);
  }

  changeEmail(email: string) {
    this._email = new Email(email);
  }

  block() {
    if (this._status.isBlocked()) throw new Error("User already blocked");
    this._status = new Status("blocked");
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email.value;
  }

  get password() {
    return this._password.value;
  }

  get status() {
    return this._status.value;
  }
}
