const { verify } = require('jsonwebtoken');
const AuthError = require('../errors/AuthError'); // 404

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }
  let payload;
  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;