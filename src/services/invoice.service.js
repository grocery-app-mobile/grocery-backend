import Invoice from '../models/invoice.model.js';

const Service = {
    createInvoice: async (data) => {
        return await Invoice.create(data);
    },

    findById: async (id) => {
        return await Invoice.findOne({ _id: id, deleted: false });
    },

    getInvoices: async (query) => {
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
            Invoice.countDocuments(filter),
            Invoice.find(filter)
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

    updateInvoice: async (id, data) => {
        return await Invoice.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
    },

    markasPaid: async (id, body) => {

        const { mode } = body;

        const order = await Invoice.findByIdAndUpdate(
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
