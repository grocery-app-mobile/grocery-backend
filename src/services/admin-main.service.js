import RepairOrder from '../models/repair-order.model.js';
import Rack from '../models/rack.model.js';
import SupportTicket from '../models/ticket.model.js';

const Service = {

    getAllRepairOrders: async (query) => {

        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.status) {
            filter.status = query.status;
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

    findRepairById: async (id) => {
        return await RepairOrder.findOne({ _id: id, deleted: false });
    },

    deleteRepairOrder: async (id) => {
        return await RepairOrder.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    },

    getAllRacks: async (query) => {

        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.status == 'remaining') {

            filter.$expr = {
                $gt: [
                    { $subtract: ["$total_slots", "$occupied_slots"] },
                    0
                ]
            };
        }

        if (query.startDate || query.endDate) {
            filter.createdAt = {};
            if (query.startDate) filter.createdAt.$gte = Number(query.startDate);
            if (query.endDate) filter.createdAt.$lte = Number(query.endDate);
        }

        const skip = (parsedPage - 1) * parsedLimit;
        const sortBy = query.sortBy || 'createdAt';
        const sortDir = (query.sortDir || 'asc').toLowerCase() === 'desc' ? -1 : 1;
        const sortData = { [sortBy]: sortDir };

        const [totalCount, result] = await Promise.all([
            Rack.countDocuments(filter),
            Rack.find(filter)
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


    createRacks: async (data) => {
        return await Rack.create(data);
    },

    updateRacks: async (id, data) => {
        return await Rack.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

    getRackById: async (id) => {
        return await Rack.findOne({ _id: id, deleted: false });
    },

    getSupportById: async (id) => {
        return await SupportTicket.findOne({ _id: id, deleted: false });
    },

    getAllSupportTickets: async (query) => {

        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.status) {
            filter.status = query.status;
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
            SupportTicket.countDocuments(filter),
            SupportTicket.find(filter)
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

    updateSupportTickets: async (id, data) => {
        return await SupportTicket.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

};

export default Service;
