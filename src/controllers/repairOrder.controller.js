import RepairService from '../services/repair.service.js';
import { createSchema,updateSchema } from '../validations/repair.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createRepairOrder = async (req, res, next) => {
    try {

        // const { error } = createSchema.validate(req.body);
        // if (error) return errorResponse(res, 400, error.details[0].message);
        req.body.customerId=req.user.id;
        const create = await RepairService.createRepairOrder(req.body);
        return successResponse(res, 201, { message: "Successfully created." ,data:create});

    } catch (err) {
        next(err);
    }

};

export const getRepairOrders = async (req, res,next) => {

    try {
        const records = await RepairService.getRepairOrders(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};


export const updateRepairOrder = async (req, res, next) => {
    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const {id}=req.params;

        const update = await RepairService.updateRepairOrder(id,req.body);
        return successResponse(res, 201, { message: "Successfully update." });

    } catch (err) {
        next(err);
    }

};


const controller = {
    createRepairOrder,
    getRepairOrders,
    updateRepairOrder
};

export default controller;
