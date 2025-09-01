import BuybackService from '../services/buyback.service.js';
import { createSchema,updateSchema } from '../validations/buyback.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createBuyBack = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await BuybackService.createBuyBack(req.body);
        return successResponse(res, 201, { message: "Successfully created.",data:create });

    } catch (err) {
        next(err);
    }

};

export const getBuyBack = async (req, res,next) => {

    try {
        const records = await BuybackService.getBuyBack(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};


export const updateBuyBack = async (req, res, next) => {
    try {

        const { error } = updateSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);

        const {id}=req.params;

        const update = await BuybackService.updateBuyBack(id,req.body);
        return successResponse(res, 201, { message: "Successfully update.",data:update });

    } catch (err) {
        next(err);
    }

};


export const updateQuote = async (req, res, next) => {
    try {

        const {id}=req.params;

        const update = await BuybackService.updateQuote(id,req.body);

        if(!update?.status){
           return errorResponse(res, 404, "Buy Back not found");         
        }

        return successResponse(res, 201, { message: "Successfully update.",data:update?.data });

    } catch (err) {
        next(err);
    }

};

export const markasPaid = async (req, res, next) => {
    try {

        const {id}=req.params;

        const update = await BuybackService.markasPaid(id,req.body);

        if(!update?.status){
           return errorResponse(res, 404, "Buy Back not found");         
        }

        return successResponse(res, 201, { message: "Successfully update.",data:update?.data });

    } catch (err) {
        next(err);
    }

};



const controller = {
    createBuyBack,
    getBuyBack,
    updateBuyBack,
    updateQuote,
    markasPaid
};

export default controller;
