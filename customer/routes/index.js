const restify = require('restify');
const Customer = require('../models/customer');
const customerController = require('../controller/customer');

module.exports = function(server) {

	// Documentation
	server.get('/doc/.*', restify.plugins.serveStatic({
    	directory: './swagger-ui',
			default: 'index.html'
  	})
	);

	// Begin Customer CRUD
	server.post('/customer', customerController.create);
	server.get('/customer/:customer_id', customerController.getById);
	server.put('/customer/:customer_id', customerController.update);
	server.del('/customer/:customer_id', customerController.deleteById);
	// End Customer CRUD
};
