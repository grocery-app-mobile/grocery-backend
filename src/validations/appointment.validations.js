import Joi from 'joi';

export const createSchema = Joi.object({
  // customerId: Joi.string().required(),
}).unknown(true);


export const updateSchema = Joi.object({
  // customerId: Joi.string().optional()
}).unknown(true);
