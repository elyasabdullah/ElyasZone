const Service = require('../model/Service');

const getAllServices = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const type = req.query.type;

    const limit = 20;
    const skip = (page - 1) * limit;

    let query = {};
    if (type) {
      query = { type: type };
    }

    const services = await Service.find(query, {author: 1, dateCreated: 1, description: 1, type: 1})
      .skip(skip)
      .limit(limit)
      .sort({ dateCreated: -1 });

    const totalServices = await Service.countDocuments(query);

    const totalPages = Math.ceil(totalServices / limit);

    return res.status(200).json({
      services,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error('Error retrieving services:', error);
    return res.status(500).json({ message: 'Error retrieving services' });
  }
};

const createNewService = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.description || !req.body.type || !req.body.contactInfo 
    || !req.body.author) {
      return res.status(400).json({ message: 'userId, description, type, and contactInfo are required' });
    }

    const newService = new Service({
      userId: req.body.userId,
      description: req.body.description,
      type: req.body.type,
      contactInfo: req.body.contactInfo,
      author: req.body.author,
      dateCreated: new Date(),
    });

    await newService.save();

    return res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating new service:', error);
    return res.status(500).json({ message: 'Error creating new service' });
  }
};

const updateService = async (req, res) => {
  try {
    if (!req.body.serviceId || !req.body.description || !req.body.type || !req.body.contactInfo) {
      return res.status(400).json({ message: 'serviceId, description, type, and contactInfo are required' });
    }

    const service = await Service.findById(req.body.serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.description = req.body.description;
    service.type = req.body.type;
    service.contactInfo = req.body.contactInfo;
    service.dateCreated = new Date();

    await service.save();

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Error updating service' });
  }
};

const deleteService = async (req, res) => {
  try {
    if (!req.body.serviceId) {
      return res.status(400).json({ message: 'serviceId is required' });
    }

    const service = await Service.findById(req.body.serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();

    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Error deleting service' });
  }
};

const getService = async (req, res) => {
  try {
    if (!req.query.serviceId) {
      return res.status(400).json({ message: 'serviceId is required' });
    }

    const service = await Service.findById(req.query.serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error retrieving service:', error);
    return res.status(500).json({ message: 'Error retrieving service' });
  }
};

const getAllUserServices = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const type = req.query.type;

    let query = { userId: userId };
    if (type) {
      query.type = type;
    }

    const userServices = await Service.find(query).sort({ dateCreated: -1 });

    return res.status(200).json(userServices);
  } catch (error) {
    console.error('Error retrieving user services:', error);
    return res.status(500).json({ message: 'Error retrieving user services' });
  }
};


module.exports = {
  getAllServices,
  createNewService,
  updateService,
  deleteService,
  getService,
  getAllUserServices
}