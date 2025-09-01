import CustomerService from '../services/customer.service.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const uploadKYC = async (req, res, next) => {
    try {

        const create = await CustomerService.uploadKYC(req.body);
        return successResponse(res, 201, { message: "Successfully created." });

    } catch (err) {
        next(err);
    }
};

export const walletTransactions = async (req, res, next) => {
    try {

        const result = await CustomerService.walletTransactions(req.body);

        if(!result.status){
            return errorResponse(res, 400, result?.message);         
        }
        
        return successResponse(res, 201, { message: "Successfully created." });

    } catch (err) {
        next(err);
    }
};

const controller = {
    uploadKYC,
    walletTransactions
};

export default controller;
