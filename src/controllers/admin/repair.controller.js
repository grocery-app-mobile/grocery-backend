import AdminService from '../../services/admin-main.service.js';
import { createSchema, updateSchema } from '../../validations/user.validations.js';
import { successResponse, errorResponse } from '../../utils/responseHandler.js';

export const getRepairOrderById = async (req, res, next) => {

    try {
        const records = await AdminService.findRepairById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};


export const updateRepairOrders = async (req, res, next) => {

    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const { id } = req.params;

        const update = await AdminService.updateRepairOrder(id, req.body);
        return successResponse(res, 201, { message: "Successfully update.", data: update });

    } catch (err) {
        next(err);
    }

};


export const getAllRepairOrders = async (req, res, next) => {
    try {

        const result = await AdminService.getAllRepairOrders(req.query);
        return successResponse(res, 200, result);

    }
    catch (err) {
        next(err);
    }
};


export const deleteRepairOrder = async (req, res) => {
    const device = await AdminService.deleteRepairOrder(req.params.id);
    if (!device) return errorResponse(res, 404, 'record not found');
    return successResponse(res, 200, { message: "Successfully deleted." });
};

export const getAllRacks = async (req, res, next) => {
    try {

        const result = await AdminService.getAllRacks(req.query);
        return successResponse(res, 200, result);

    }
    catch (err) {
        next(err);
    }
};

export const createRacks = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await AdminService.createRacks(req.body);
        return successResponse(res, 201, { message: "Successfully created.",data:create });

    } catch (err) {
        next(err);
    }

};

export const updateRacks = async (req, res, next) => {

    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const { id } = req.params;

        const update = await AdminService.updateRacks(id, req.body);
        return successResponse(res, 201, { message: "Successfully update.", data: update });

    } catch (err) {
        next(err);
    }

};


export const getRackById = async (req, res, next) => {

    try {
        const records = await AdminService.getRackById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};

export const getSupportById = async (req, res, next) => {

    try {
        const records = await AdminService.getSupportById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};



export const getAllSupportTickets = async (req, res, next) => {
    try {

        const result = await AdminService.getAllSupportTickets(req.query);
        return successResponse(res, 200, result);

    }
    catch (err) {
        next(err);
    }
};

export const updateSupportTickets = async (req, res, next) => {

    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const { id } = req.params;

        const update = await AdminService.updateSupportTickets(id, req.body);
        return successResponse(res, 201, { message: "Successfully update.", data: update });

    } catch (err) {
        next(err);
    }

};

const controller = {
    getRepairOrderById,
    updateRepairOrders,
    deleteRepairOrder,
    getAllRepairOrders,
    getAllRacks,
    createRacks,
    updateRacks,
    getRackById,
    getSupportById,
    getAllSupportTickets,
    updateSupportTickets
};

export default controller;
