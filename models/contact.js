const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, regexp } = require('../helpers');

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

const contactValidateSchema = Joi.object({
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
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().default("false").required().messages({
    "any.required": `missing required favorite field`,
  }),
});

const schemas = {
  contactValidateSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};