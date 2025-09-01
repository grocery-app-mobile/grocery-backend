import Appointment from '../models/appointment.model.js';

const Service = {
  createAppointment : async (data) => {
    return await Appointment.create(data);
  },

  getAppointments : async (query) => {
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
      Appointment.countDocuments(filter),
      Appointment.find(filter)
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

};

export default Service;
