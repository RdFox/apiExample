const errors = require('restify-errors');
const restify = require('restify');
const Customer = require('../models/customer');
const customerController = require('../controller/customer');
const orderController = require('../controller/order');

module.exports = function(server) {

	// Documentation
	server.get('/doc/.*', restify.plugins.serveStatic({
    	directory: './swaggerui',
			default: '/docs.html'
  	})
	);

	// Begin Customer CRUD
	server.post('/customer', customerController.create);
	server.get('/customers', customerController.list);
	server.get('/customer/:customer_id', customerController.getById);
	server.put('/customer/:customer_id', customerController.update);
	server.del('/customer/:customer_id', customerController.deleteById);
	// End Customer CRUD

	// Begin Order CRUD
	server.post('/customer/:customer_id/order', orderController.create);
	server.get('/customer/:customer_id/orders', orderController.list);
	server.get('/customer/:customer_id/order/:order_id', orderController.getById);
	server.del('/customer/:customer_id/order/:order_id', orderController.deleteById);
	// End Order CRUD

};
