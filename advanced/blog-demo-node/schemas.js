const Joi = require("joi");

module.exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required(),
  rating: Joi.number().required(),
});
