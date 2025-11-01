import UserService from '../../services/user.service.js';
import { createSchema, updateSchema } from '../../validations/user.validations.js';
import { successResponse, errorResponse } from '../../utils/responseHandler.js';

export const create = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const create = await UserService.create(req.body);
        return successResponse(res, 201, { message: "Successfully created.", data: create });

    } catch (err) {
        next(err);
    }
};

export const findById = async (req, res, next) => {

    try {
        const records = await UserService.findById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};


export const update = async (req, res, next) => {
    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const { id } = req.params;

        const update = await UserService.update(id, req.body);
        return successResponse(res, 201, { message: "Successfully update.", data: update });

    } catch (err) {
        next(err);
    }

};


export const getAllUsers = async (req, res, next) => {
    try {

        const result = await UserService.getAll(req.query);
        return successResponse(res, 200, result);

    }
    catch (err) {
        next(err);
    }
};


export const remove = async (req, res) => {
    const device = await UserService.delete(req.params.id);
    if (!device) return errorResponse(res, 404, 'record not found');
    return successResponse(res, 200, { message: "Successfully deleted." });
};

export const getDashboardData = async (req, res) => {
    const data = {
        totalActiveRepairs: 34,
        devicesInTransit: 18,
        completedRepairsToday: 12,
        totalEngineersOnline: 8,
        appointmentsBookedToday: 14,
        rackUtilization: 78,
        invoicesGenerated: 9,
        revenueToday: 45000,
        pendingApprovals: 5
    };

    return successResponse(res, 200, { 
        message: "Successfully fetched dashboard data.", 
        data 
    });
};

const controller = {
    create,
    findById,
    update,
    remove,
    getAllUsers,
    getDashboardData
};

export default controller;
