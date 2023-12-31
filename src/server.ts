import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import {
  brandsRouter,
  categoriesRouter,
  ordersRouter,
  productsRouter,
  usersRouter,
} from "./routers";
import connect from "./database/database";
import authJwt from "./helpers/jwt";

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
app.use(`${api}/categories`, authJwt, categoriesRouter);
app.use(`${api}/brands`, authJwt, brandsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

app.listen(port, async () => {
  connect();
  console.log(`listening on port : ${port}`);
});
