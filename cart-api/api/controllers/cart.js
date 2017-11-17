const errors = require('restify-errors');

// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = {getAll, save, update, delProduct};

//GET /customer/{customerId}/cart/products/ operationId
function getAll(req, res, next) {
  //req.swagger contains the path parameters
  var cId = req.swagger.params.customerId.value;
  var customer = db.find(cId);
  if (!customer) {
    return next(new errors.NotFoundError("No Such Customer!"));
  } else {
    res.json({ products: db.find(cId)});
  }
}
//POST /customer/{customerId}/cart/product/ operationId
function save(req, res, next) {
  var cId = req.swagger.params.customerId.value;
  var customer = db.find(cId);
  if (!customer) {
    return next(new errors.NotFoundError("No Such Customer!"));
  } else {
    var pId = req.body.pId;
    var product = customer.find(element => {
      return element.pId === pId;
    });
    if(!product) {
      res.json({success: db.save(cId, req.body), description: "Product added to the cart!"});
    } else {
      return next(new errors.ConflictError("This product is already in cart!"));
    }
  }
}
//PUT /customer/{customerId}/cart/product/{productId} operationId
function update(req, res, next) {
  var cId = req.swagger.params.customerId.value;
  var customer = db.find(cId);
  if (!customer) {
    return next(new errors.NotFoundError("No Such Customer!"));
  } else {
    var pId = req.swagger.params.productId.value;
    var product = req.body;
    if (db.update(cId, pId, product)) {
      res.json({success: 1, description: "Product updated!"});
    } else {
      return next(new errors.NotFoundError("No such product in cart!"));
    }
  }
}
//DELETE /customer/{customerId}/cart/product/{productId} operationId
function delProduct(req, res, next) {
  var cId = req.swagger.params.customerId.value;
  var customer = db.find(cId);
  if (!customer) {
    return next(new errors.NotFoundError("No Such Customer!"));
  } else {
    var pId = req.swagger.params.productId.value;
    if (db.remove(cId, pId)) {
      res.json({success: 1, description: "Product removed from cart!"});
    } else {
      return next(new errors.NotFoundError("No such product in cart!"));
    }
  }
}
