import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode";

const authJwt = async (req: any, res: any, next: any) => {
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const jwtObject: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
};

export default authJwt;
