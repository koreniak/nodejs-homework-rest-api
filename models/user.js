const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, regexp } = require('../helpers');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  token: String,
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerValidateSchema = Joi.object({
  password: Joi.string().min(8).pattern(regexp.passwordRegexp).required().messages({
    "any.required": `missing required password field`,
    "string.pattern.base": `password may contain min 8 chars, at least one letter and one number and may contain special characters`,
  }),
  email: Joi.string().pattern(regexp.emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": `enter a valid email`,
  }),
  subscription: Joi.string(),
});

const loginValidateSchema = Joi.object({
  password: Joi.string().min(8).pattern(regexp.passwordRegexp).required().messages({
    "any.required": `missing required password field`,
    "string.pattern.base": `password may contain min 8 chars, at least one letter and one number and may contain special characters`,
  }),
  email: Joi.string().pattern(regexp.emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": `enter a valid email`,
  }),
  subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
  avatarURL: Joi.string().uri(),
  token: Joi.string().token(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").default("starter").required().messages({
    "any.required": `missing required subscription field`,
  }),
});

const verifyValidateSchema = Joi.object({
  email: Joi.string().pattern(regexp.emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": `enter a valid email`,
  }),
});

const schemas = {
  registerValidateSchema,
  loginValidateSchema,
  updateSubscriptionSchema,
  verifyValidateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};