const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user-controller');

Router.post('/login', userController.login);
Router.post('/signup', userController.signup);
Router.put('/update', userController.updateUser);

module.exports = Router;