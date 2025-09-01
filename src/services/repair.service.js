import { createRepairOrder } from '../controllers/repairOrder.controller.js';
import RepairOrder from '../models/repair-order.model.js';

const Service = {
    createRepairOrder: async (data) => {
        return await RepairOrder.create(data);
    },

    getRepairOrders: async (query) => {
        const filter = { deleted: false };
        const { limit, page } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.startDate || query.endDate) {
            filter.createdAt = {};
            if (query.startDate) {
                filter.createdAt.$gte = Number(query.startDate);
            }
            if (query.endDate) {
                filter.createdAt.$lte = Number(query.endDate);
            }
        }

        const skip = (parsedPage - 1) * parsedLimit;
        const sortBy = query.sortBy || 'createdAt';
        const sortDir = (query.sortDir || 'asc').toLowerCase() === 'desc' ? -1 : 1;
        const sortData = { [sortBy]: sortDir };

        const [totalCount, result] = await Promise.all([
            RepairOrder.countDocuments(filter),
            RepairOrder.find(filter)
                .sort(sortData)
                .skip(skip)
                .limit(parsedLimit)
                .lean()
        ]);

        const totalPages = Math.max(1, Math.ceil(totalCount / parsedLimit));

        return {
            data: result,
            totalCount,
            totalPages,
            page: parsedPage,
            limit: parsedLimit
        };

    },

    updateRepairOrder: async (id, data) => {
        return await RepairOrder.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

};

export default Service;
