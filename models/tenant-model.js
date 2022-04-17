const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantModel = new Schema({
  userId: {type: String, required: true},
  tenantId: {type: String, required: true},
  idNumber: {type: String, required: true},
}, {
  timestamps: true,
});

const tenantSchema = mongoose.model('TenantModel', tenantModel);
module.exports = tenantSchema;