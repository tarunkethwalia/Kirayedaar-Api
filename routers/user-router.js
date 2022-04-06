const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user-controller');

Router.post('/login', userController.login);
Router.post('/signup', userController.signup);
Router.post('/update', userController.updateUser);
Router.post('/getUserData', userController.getUserData);

module.exports = Router;