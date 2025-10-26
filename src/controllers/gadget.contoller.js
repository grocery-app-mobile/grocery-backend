import GadgetService from '../services/gadget.service.js';
import { createSchema } from '../validations/gadget.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const sellProduct = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await GadgetService.sellProduct(req.body);
        return successResponse(res, 201, { message: "Successfully created." });

    } catch (err) {
        next(err);
    }
};

export const getPriceEstimate = async (req, res,next) => {

    try {
        const records = await GadgetService.getPriceEstimate(req.query);
        return successResponse(res, 200, records);
    } catch (err) {
        next(err);
    }

};

export const getSellGadgets = async (req, res,next) => {

    try {
        const records = await GadgetService.getSellGadgets(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};

export const getTrackOrders = async (req, res,next) => {

    try {
        const records = await GadgetService.getTrackOrders(req.params.id);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};

const controller = {
    getPriceEstimate,
    sellProduct,
    getSellGadgets,
    getTrackOrders
};

export default controller;
