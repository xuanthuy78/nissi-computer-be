import { Request } from "express";
import { urlUpload } from "../common/config";

export const pathUpload = (req: Request): string => {
  return `${req.protocol}://${req.get("host")}${urlUpload}`;
};
