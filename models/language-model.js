const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageModel = new Schema({
  type: {type: String , required: true, default: 'English'},
  screen: {type: String, required: true},
  text: {type: String, required: true},
}, {
  timestamps: true,
});

const languageSchema = mongoose.model('LanguageModel', languageModel);
module.exports = languageSchema;