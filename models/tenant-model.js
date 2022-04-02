const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantModel = new Schema({
  userId: {type: String, required: true},
  accountType: {type: String, required: true}, // Tenant or Landlord
}, {
  timestamps: true,
});

const tenantSchema = mongoose.model('TenantModel', tenantModel);
module.exports = tenantSchema;