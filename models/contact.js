const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, regexp } = require('../helpers');

// const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$/;
// const phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
// const emailRegexp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const contactJoiSchema = Joi.object({
  name: Joi.string().pattern(regexp.nameRegexp).required().messages({
    "any.required": `missing required name field`,
    "string.pattern.base": `name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`,
  }),
  email: Joi.string().pattern(regexp.emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": `enter a valid email`,
  }),
  phone: Joi.string().pattern(regexp.phoneRegexp).required().messages({
    "any.required": `missing required phone field`,
    "string.pattern.base": `phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
  }),
  favorite: Joi.boolean().default("false"),
  owner: Joi.object({
    email: Joi.string().pattern(regexp.emailRegexp).required().messages({
      "any.required": `missing required email field`,
      "string.pattern.base": `enter a valid email`,
    }),
    subscription: Joi.string().default("starter"),
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().default("false").required().messages({
    "any.required": `missing required favorite field`,
  }),
});

const schemas = {
  contactJoiSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};