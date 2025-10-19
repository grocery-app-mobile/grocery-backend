import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
}).unknown(true);


export const updateSchema = Joi.object({
}).unknown(true);
