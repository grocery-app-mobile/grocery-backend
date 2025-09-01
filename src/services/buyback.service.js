import Buyback from '../models/buy-back.model.js';

const Service = {
    createBuyBack: async (data) => {
        return await Buyback.create(data);
    },

    getBuyBack: async (query) => {
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
            Buyback.countDocuments(filter),
            Buyback.find(filter)
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

    updateBuyBack: async (id, data) => {
        return await Buyback.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

    updateQuote: async (id, body) => {

        const { finalPrice, status } = body;

        const order = await Buyback.findByIdAndUpdate(
            id,
            {
                finalPrice,
                status: status,
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!order) return {
            status: false
        }

        return {
            status: true,
            data: order
        }

    },

    markasPaid: async (id, body) => {

        const { mode } = body;

        const order = await Buyback.findByIdAndUpdate(
            id,
            {
                status: "paid",
                "payment.mode": mode,
                "payment.paidAt": new Date(),
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!order) return {
            status: false
        }

        return {
            status: true,
            data: order
        }

    }

};

export default Service;
