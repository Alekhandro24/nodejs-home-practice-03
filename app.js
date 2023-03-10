// 7lofD0RwUmtwj8AX  = Alekhandro
//mongodb+srv://Alekhandro:7lofD0RwUmtwj8AX@cluster0.ytqgn16.mongodb.net/test
// const DB_HOST =
//   "mongodb+srv://Alekhandro:7lofD0RwUmtwj8AX@cluster0.ytqgn16.mongodb.net/online_shop?retryWrites=true&w=majority";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/api/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
