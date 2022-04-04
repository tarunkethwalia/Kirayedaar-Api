const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  fullname: {type: String , required: true},
  email: {type: String, required: true},
  password: {type: String},
  viewPassword: {type: String},
  externalLogin: {type: Boolean, default: false},
  profileUrl: {type: String, default: 'default'},
  userVerified: {type: Boolean, default: false},
  status: {type: Boolean, default: true},
  accountType: {type: String, default: null}, // Tenant or Landlord
  subscriptionType: {type: String, default: 'Free'}, // Free or Paid
}, {
  timestamps: true,
});

const userSchema = mongoose.model('UserModel', userModel);
module.exports = userSchema;