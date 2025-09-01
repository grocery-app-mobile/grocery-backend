import InvoiceService from '../services/invoice.service.js';
import { createSchema,updateSchema } from '../validations/invoice.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createInvoice = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await InvoiceService.createInvoice(req.body);
        return successResponse(res, 201, { message: "Successfully created.",data:create });

    } catch (err) {
        next(err);
    }

};

export const getInvoices = async (req, res,next) => {

    try {
        const records = await InvoiceService.getInvoices(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};

export const markasPaid = async (req, res, next) => {
    try {

        const {id}=req.params;

        const update = await InvoiceService.markasPaid(id,req.body);

        if(!update?.status){
           return errorResponse(res, 404, "Buy Back not found");         
        }

        return successResponse(res, 201, { message: "Successfully update.",data:update?.data });

    } catch (err) {
        next(err);
    }

};


export const getInvoiceById = async (req, res,next) => {

    try {
        const records = await InvoiceService.findById(req.params.id);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};

const controller = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    markasPaid
};

export default controller;
