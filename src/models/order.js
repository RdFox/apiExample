const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const orderSchema = mongoose.Schema({
  date: String,
  deliveryTime: String,
  deliveryAddress: String,
  status: {
    type: String,
    enum: ['OPEN', 'IN PROCESS', 'IN DELIVERY', 'SUCCESSFUL', 'DISCARDED'],
    default: 'OPEN'
  },
  _customer: String
});

orderSchema.plugin(timestamps);
orderSchema.plugin(mongooseStringQuery);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
