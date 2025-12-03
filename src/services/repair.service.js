import RepairOrder from '../models/repair-order.model.js';
import Rack from '../models/rack.model.js';

const Service = {

    findLastOrder: async () => {
        return RepairOrder.findOne().sort({ createdAt: -1 });
    },

    createRepairOrder: async (data) => {
        return await RepairOrder.create(data);
    },

    getRepairOrders: async (query) => {
        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.status) {
            if (typeof query.status === "string" && query.status.includes(",")) {
                filter.status = { $in: query.status.split(",") };
            } else {
                filter.status = query.status;
            }
        }

        if (query.customerId) {
            filter.customerId = query.customerId;
        }

        if (query.engineerId) {
            filter.engineerId = query.engineerId;
        }

        if (query.qcEngineerId) {
            filter.qcEngineerId = query.qcEngineerId;
        }

        if (query.orderId) {
            filter.orderId = query.orderId;
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

        if(data?.rackId){
            const updatedRack = await Rack.findOneAndUpdate(
                { _id: data.rackId, deleted: false },
                { $inc: { occupied_slots: 1 } },
                { new: true }
            );
        }
        return await RepairOrder.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
        
    },

};

export default Service;
