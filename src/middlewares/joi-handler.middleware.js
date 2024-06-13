import joi from 'joi';
import { MESSAGES } from '../constants/message.constant.js';
import { AUTH_CONSTANT } from '../constants/auth.constant.js';

export const signupValidator = async (req, res, next) => {
  try {
    const signupSchema = joi.object({
      name: joi.string().min(2).required().messages({
        'string.base': MESSAGES.AUTH.COMMON.NAME.BASE,
        'string.min': MESSAGES.AUTH.COMMON.NAME.MIN,
        'string.empty': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
        'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
      }),
      email: joi
        .string()
        .required()
        .email({
          minDomainSegments: AUTH_CONSTANT.MIN_DOMAIN_SEGMENTS,
          tlds: { allow: AUTH_CONSTANT.TLDS },
        })
        .messages({
          'string.base': MESSAGES.AUTH.COMMON.EMAIL.BASE,
          'string.pattern.base': MESSAGES.AUTH.COMMON.EMAIL.EMAIL,
          'string.empty': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
          'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
        }),
      password: joi.string().min(6).max(30).required().messages({
        'string.base': 'This password must be only type of string.',
        'string.min': 'This password must have at least 6 characters.',
        'string.max': 'This password can be up to 30 characters long.',
        'string.empty': 'Be sure to enter your password.',
        'any.required': 'Be sure to enter your password.',
      }),
      passwordCheck: joi.string().min(6).max(30).required().messages({
        'string.base': 'This password for verification must be only type of string.',
        'string.min': 'This password for verification must have at least 6 characters.',
        'string.max': 'This password for verification can be up to 30 characters long.',
        'string.empty': 'Be sure to enter your password for verification.',
        'any.required': 'Be sure to enter your password for verification.',
      }),
    });

    await signupSchema.validateAsync(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidator = async (req, res, next) => {
  try {
    const loginSchema = joi.object({
      email: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .pattern(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}'))
        .messages({
          'string.base': 'This email must be only type of string.',
          'string.min': 'This email must have at least 1 characters.',
          'string.max': 'This email can be up to 30 characters long.',
          'string.empty': 'Be sure to enter your email.',
          'any.required': 'Be sure to enter your email.',
          'string.pattern.base': 'This email is not vaild.',
        }),
      password: joi.string().min(6).max(30).required().messages({
        'string.base': 'This password must be only type of string.',
        'string.min': 'This password must have at least 6 characters.',
        'string.max': 'This password can be up to 30 characters long.',
        'string.empty': 'Be sure to enter your password.',
        'any.required': 'Be sure to enter your password.',
      }),
    });

    await loginSchema.validateAsync(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

export const resumeCreateValidator = async (req, res, next) => {
  try {
    const createSchema = joi.object({
      title: joi.string().min(2).max(30).required().messages({
        'string.base': 'This title must be only type of string.',
        'string.min': 'This title must have at least 2 characters.',
        'string.max': 'This title can be up to 30 characters long.',
        'string.empty': 'Be sure to enter your title.',
        'any.required': 'Be sure to enter your title.',
      }),
      introduce: joi.string().min(5).max(1000).required().messages({
        'string.base': 'This introduce must be only type of string.',
        'string.min': 'This introduce must have at least 150 characters.',
        'string.max': 'This introduce can be up to 1000 characters long.',
        'string.empty': 'Be sure to enter your introduce.',
        'any.required': 'Be sure to enter your introduce.',
      }),
    });

    await createSchema.validateAsync(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

export const resumeUpdateValidator = async (req, res, next) => {
  try {
    const updateSchema = joi.object({
      title: joi.string().min(2).max(30).optional().messages({
        'string.base': 'This title must be only type of string.',
        'string.min': 'This title must have at least 2 characters.',
        'string.max': 'This title can be up to 30 characters long.',
      }),
      introduce: joi.string().min(5).max(1000).optional().messages({
        'string.base': 'This introduce must be only type of string.',
        'string.min': 'This introduce must have at least 150 characters.',
        'string.max': 'This introduce can be up to 1000 characters long.',
      }),
    });

    await updateSchema.validateAsync(req.body);

    next();
  } catch (error) {
    next(error);
  }
};
