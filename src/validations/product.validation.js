import Joi from 'joi';

export const createSchema = Joi.object({
  productName: Joi.string().required(),
}).unknown(true);


export const updateSchema = Joi.object({
  productName: Joi.string().optional()
}).unknown(true);
