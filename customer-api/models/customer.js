const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const customerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  zipCode: String,
  address: String,
});

customerSchema.plugin(timestamps);
customerSchema.plugin(mongooseStringQuery);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
