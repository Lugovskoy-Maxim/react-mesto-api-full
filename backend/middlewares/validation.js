const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL, isEmail } = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректная ссылка на изображение');
      return value;
    }),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) throw new CelebrateError('Некорректный Email');
      return value;
    }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректная ссылка на изображение');
      return value;
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректная ссылка на изображение');
      return value;
    }),
  }),
});

module.exports = {
  validateLogin,
  validateUserAvatar,
  validateUserInfo,
  validateRegister,
  validateUserId,
  validateCardId,
  validateCard,
};
