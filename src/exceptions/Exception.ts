import { print, OutputType } from "../helpers/print";

export default class Exception extends Error {
  validationErrors: any;

  static WRONG_DB_USERNAME_PASSWORD =
    "Wrong datatabase's username and password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
  static NO_INTERNET = "No internet";
  static WRONG_EMAIL = "Incorrect email format";

  constructor(message: string, validationErrors = {}) {
    super(message);
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
