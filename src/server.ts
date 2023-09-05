import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { productsRouter } from "./routers";
import connect from "./database/database";

dotenv.config();

const app = express();
const port = process.env.PORT;
const api = process.env.API_URL;

app.use(morgan("tiny"));
app.use(`${api}/products`, productsRouter);

app.listen(port, async () => {
  connect();
  console.log(`listening on port : ${port}`);
});
