import Joi from 'joi';

export const createSchema = Joi.object({
  product: Joi.string().required(),
  purchase_date: Joi.string().required(),
  issue_description: Joi.string().required(),
  invoice: Joi.string().optional()
}).unknown(true);

