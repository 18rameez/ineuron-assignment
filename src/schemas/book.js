const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  ISBNCode: Joi.string().required(),
  price: Joi.string().required()
});

module.exports = bookSchema;