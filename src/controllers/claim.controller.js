import ClaimService from '../services/claim.service.js';
import { createSchema } from '../validations/warranty.validations.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createNewClaim = async (req, res, next) => {
    try {

        const { error } = createSchema.validate(req.body);
        if (error) return errorResponse(res, 400, error.details[0].message);
        const create = await ClaimService.createNewClaim(req.body);
        return successResponse(res, 201, { message: "Successfully created." });

    } catch (err) {
        next(err);
    }
};

export const getClaims = async (req, res,next) => {

    try {
        const records = await ClaimService.getClaims(req.query);
        return successResponse(res, 200, records);

    } catch (err) {
        next(err);
    }

};

const controller = {
    createNewClaim,
    getClaims
};

export default controller;
