import AppointmentService from '../services/appointment.service.js';
import { createSchema } from '../validations/appointment.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createAppointment = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        req.body.customerId=req.user.id;
        const create = await AppointmentService.createAppointment(req.body);
        return successResponse(res, 201, { message: "Successfully created." ,data:create});

    } catch (err) {
        next(err);
    }

};

export const getAppointments = async (req, res,next) => {

    try {
        const records = await AppointmentService.getAppointments(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};


const controller = {
    createAppointment,
    getAppointments
};

export default controller;
