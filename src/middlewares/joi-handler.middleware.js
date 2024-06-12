import joi from 'joi';

export const signupValidation = joi.object({
  name: joi.string().min(2).max(10).required().messages({
    'string.base': 'This name must be only type of string.',
    'string.min': 'This name must have at least 2 characters.',
    'string.max': 'This name can be up to 10 characters long.',
    'string.empty': 'Be sure to enter your name.',
    'any.required': 'Be sure to enter your name',
  }),
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
  passwordCheck: joi.string().min(6).max(30).required().messages({
    'string.base': 'This password for verification must be only type of string.',
    'string.min': 'This password for verification must have at least 6 characters.',
    'string.max': 'This password for verification can be up to 30 characters long.',
    'string.empty': 'Be sure to enter your password for verification.',
    'any.required': 'Be sure to enter your password for verification.',
  }),
});

export const loginValidation = joi.object({
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

export const resumeCreateValidation = joi.object({
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

export const resumeUpdateValidation = joi.object({
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
