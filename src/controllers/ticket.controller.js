import TicketService from '../services/ticket.service.js';
import { createSchema,updateSchema } from '../validations/repair.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createTicket = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await TicketService.createTicket(req.body);
        return successResponse(res, 201, { message: "Successfully created." });

    } catch (err) {
        next(err);
    }

};

export const getTickets = async (req, res,next) => {

    try {
        const records = await TicketService.getTickets(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};

export const getTicketById = async (req, res,next) => {

    try {
        const records = await TicketService.findById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};

export const updateTicket = async (req, res, next) => {
    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const {id}=req.params;

        const update = await TicketService.updateTicket(id,req.body);
        return successResponse(res, 201, { message: "Successfully update." });

    } catch (err) {
        next(err);
    }

};

export const deleteTicket = async (req, res, next) => {
    try {

        const {id}=req.params;
        const deleted = await TicketService.deleteTicket(id);
        return successResponse(res, 201, { message: "Successfully deleted." });

    } catch (err) {
        next(err);
    }

};


const controller = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};

export default controller;
