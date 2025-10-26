import Joi from 'joi';

export const createSchema = Joi.object({
  product: Joi.string().required(),
  modelName: Joi.string().required(),
  serialNumber: Joi.string().required()
}).unknown(true);

