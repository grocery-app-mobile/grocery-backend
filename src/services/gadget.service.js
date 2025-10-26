import sellGadget from '../models/sell-gadget.model.js';

const Service = {

    sellProduct: async (data) => {
        return await sellGadget.create(data);
    },

    getPriceEstimate: async (query) => {
        const { limit, page } = query;
        return {
            price: 200
        };
    },

    getSellGadgets: async (query) => {
        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

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
            sellGadget.countDocuments(filter),
            sellGadget.find(filter)
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

    getTrackOrders: async (id) => {
        return await sellGadget.findById(id);
    },
    
};

export default Service;
