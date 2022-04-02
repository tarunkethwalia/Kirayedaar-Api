const express = require('express');
const Router = express.Router();
const languageController = require('../controllers/language-controller');

Router.post('/addLanguage', languageController.addLanguage);
Router.post('/getLanguageList', languageController.getLanguage);

module.exports = Router;