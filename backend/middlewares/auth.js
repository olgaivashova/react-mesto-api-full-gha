const jwt = require("jsonwebtoken");

// const { SECRET_KEY = "hello mesto" } = process.env;
const UnauthorizedError = require("../errors/unauthorizedError");

// console.log(SECRET_KEY);

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, "some-secret-key"); // SECRET_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError("Необходима авторизация");
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
