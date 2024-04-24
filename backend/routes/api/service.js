const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/ServiceController')

router.route('/')
    .get(serviceController.getAllServices)
    .post(serviceController.createNewService)
    .put(serviceController.updateService)
    .delete(serviceController.deleteService);

router.route('/get_service')
    .get(serviceController.getService);
router.route('/userservices')
    .get(serviceController.getAllUserServices)

module.exports = router;