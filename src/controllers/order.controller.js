import OrderService from '../services/order.service.js';
import { createSchema, updateSchema } from '../validations/product.validation.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const create = async (req, res) => {
  const { error } = createSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  const create = await OrderService.create(req.body);
  return successResponse(res, 201, {message:"Successfully created."});
};

export const list = async (req, res) => {
  const records = await OrderService.getAll(req.query);
  return successResponse(res, 200,records);
};

export const findById = async (req, res) => {
  const product = await OrderService.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Country not found');
  return successResponse(res, 200, product);
};

export const update = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  const product = await OrderService.update(req.params.id, req.body);
  if (!product) return errorResponse(res, 404, 'Country not found');
  return successResponse(res, 200, {message:"Successfully updated."});
};

export const remove = async (req, res) => {
  const product = await OrderService.delete(req.params.id);
  if (!product) return errorResponse(res, 404, 'Country not found');
  return successResponse(res, 200, {message:"Successfully deleted."});
};

const controller = {
    create,
    list,
    findById,
    update,
    remove,
};
  
export default controller;
  