const errors = require('restify-errors');
const Customer = require('../models/customer');

function create (req, res, next) {
  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'"),
    );
  }
  let data = req.body || {};
  if(data.zipCode != "74074") {
    return next(
      new errors.InvalidArgumentError("The given ZIP Code is not in the delivery area!")
    );
  }

  let customer = new Customer(data);
  customer.save(function(err) {
    if (err) {
      console.error(err);
      return next(new errors.InternalError(err.message));
      next();
    }

    res.send(201, customer);
    next();
  });
}

function list (req, res, next) {
  Customer.apiQuery(req.params, function(err, docs) {
    if (err) {
      console.error(err);
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      );
    }
    if(docs.length === 0){
      res.send(204);
      return next();
    }
    res.send(docs);
    next();
  });
}

function getById (req, res, next) {
  Customer.findOne({ _id: req.params.customer_id }, function(err, doc) {
    if (err) {
      console.error(err);
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      );
    }
    if (doc === null) {
      return next(
        new errors.NotFoundError("Customer not found")
      );
    }

    res.send(doc);
    next();
  });
}

function update (req, res, next) {
  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'"),
    );
  }

  let data = req.body || {};

  if(data.zipCode != '74074') {
    return next(
      new errors.InvalidArgumentError("The given ZIP Code is not in the delivery area!")
    );
  }

  if (!data._id) {
    data = Object.assign({}, data, { _id: req.params.customer_id });
  }

  Customer.findOne({ _id: req.params.customer_id }, function(err, doc) {
    if (err) {
      console.error(err);
      return next(
        new errors.UnprocessableEntityError(err.errors.name.message),
      );
    } else if (!doc) {
      return next(
        new errors.NotFoundError('Customer not found'),
      );
    }

    Customer.update({ _id: data._id }, data, function(err) {
      if (err) {
        console.error(err);
        return next(
          new errors.UnprocessableEntityError(err.errors.name.message),
        );
      }

      res.send(200, data);
      next();
    });
  });
}

function deleteById (req, res, next) {
  Customer.remove({ _id: req.params.customer_id }, function(err) {
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



module.exports = {create, list, getById, update, deleteById}
