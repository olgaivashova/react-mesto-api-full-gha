/* eslint-disable spaced-comment */
/* eslint-disable comma-dangle */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mydb" } = process.env;
const bodyParser = require("body-parser");

const helmet = require("helmet");
const { errors } = require("celebrate");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");
const routerSignup = require("./routes/signup");
const routerLogin = require("./routes/login");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/notFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(cors());
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(123456);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов до роутов

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.use("/signup", routerSignup);
app.use("/signin", routerLogin);
app.use(auth);
app.use("/users", routerUsers);
app.use("/cards", routerCards);
app.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});
app.use(errorLogger); // подключаем логгер ошибок после роутов, но до обработчиков ошибок
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер ${PORT}`);
});
