import Product from '../models/product.model.js';

const Service = {
  create: async (data) => {
    return await Product.create(data);
  },

  getAll: async (query) => {
    const filter = { deleted: false };
    const { limit, page } = query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    if (query.name) {
      filter.name = query.name;
    }

    if (query.shopId) {
      filter.shopId = query.shopId;
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
      Product.countDocuments(filter),
      Product.find(filter)
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
    return await Product.findOne({ _id: id, deleted: false });
  },

  update: async (id, data) => {
    return await Product.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
  },

  delete: async (id) => {
    return await Product.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
  }

};

export default Service;
