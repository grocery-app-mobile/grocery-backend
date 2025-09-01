import { getTickets } from '../controllers/ticket.controller.js';
import Ticket from '../models/ticket.model.js';

const Service = {
    createTicket: async (data) => {
        return await Ticket.create(data);
    },

    getTickets: async (query) => {
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
            Ticket.countDocuments(filter),
            Ticket.find(filter)
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

    findById: async (id) => {
        return await Ticket.findOne({ _id: id, deleted: false });
    },

    updateTicket: async (id, data) => {
        return await Ticket.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

    deleteTicket: async (id) => {
        return await Ticket.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    }

};

export default Service;
