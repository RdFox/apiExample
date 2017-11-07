const errors = require('restify-errors');
const Order = require('../models/order');

function create (req, res, next) {
  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'"),
    );
  }
  let data = req.body || {};
  data._customer = req.params.customer_id;
  let order = new Order(data);
  order.save(function(err) {
    if (err) {
      console.error(err);
      return next(new errors.InternalError(err.message));
      next();
    }

    res.send(201);
    next();
  });
}

function list (req, res, next) {
  Order.apiQuery({ customer: req.params.customer_id }, function(err, docs) {
    if (err) {
      console.error(err);
      return next(
        new errors.InvalidContentError(err.errors.name.message)
      );
    }
    if(docs.length === 0){
      res.send(204);
      return next();
    }

    res.send(200, docs);
    next();
  });
}

function getById (req, res, next) {
  Order.findOne({ _id: req.params.order_id }, function(err, doc) {
    if (err) {
      console.error(err);
      return next(
        new errors.InvalidContentError(err.errors.name.message)
      );
    }
    if (doc === null) {
      return next(
        new errors.NotFoundError("Order not found")
      );
    }

    res.send(200, doc);
    next();
  });
}

function deleteById (req, res, next) {
  Order.remove({ _id: req.params.order_id }, function(err) {
    if (err) {
      console.error(err);
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      );
    }

    res.send(204);
    next();
  });
}



module.exports = {create, list, getById, deleteById}
