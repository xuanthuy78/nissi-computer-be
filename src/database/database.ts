import mongoose from "mongoose";
import Exception from "../exceptions/Exception";
import { print, OutputType } from "../helpers/print";
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI as string);
    print("Connect mongoose successfully", OutputType.SUCCESS);
    return connection;
  } catch (error: any) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    } else if (code == "ECONNREFUSED") {
      throw new Exception(Exception.NO_INTERNET);
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
};

export default connect;
