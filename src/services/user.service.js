import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const Service = {
    create: async (data) => {

        const { password } = data;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        data.password = hashedPassword;

        return await User.create(data);

    },

    getAll: async (query) => {
        const filter = { deleted: false };
        const { limit = 10, page = 1 } = query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (query.name) {
            filter.name = query.name;
        }

        if (query.role) {
            filter.role = query.role;
        }

        if (query.email) {
            filter.email = query.email;
        }

        if (query.phone) {
            filter.phone = query.phone;
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
            User.countDocuments(filter),
            User.find(filter)
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
        return await User.findOne({ _id: id, deleted: false });
    },

    update: async (id, data) => {

        if (data?.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;
        } else {
            delete data.password;
        }

        return await User.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });

    },

    delete: async (id) => {
        return await User.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    }

};

export default Service;
