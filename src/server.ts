import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { brandsRouter, categoriesRouter, productsRouter } from "./routers";
import connect from "./database/database";

dotenv.config();

const app = express();
const port = process.env.PORT;
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());

app.use(morgan("tiny"));
app.use(express.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/brands`, brandsRouter);

app.listen(port, async () => {
  connect();
  console.log(`listening on port : ${port}`);
});
