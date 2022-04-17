const express = require('express');
const Router = express.Router();
const tenantController = require('../controllers/tenant-controller');

Router.post('/addTenantDetails', tenantController.addTenantDetails);

module.exports = Router;