const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const eCommerceController = require('./e-commerce-controller');
const eCommerceValidator = require('./e-commerce-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/Market', route);

  // Get list of users
  route.get('/', authenticationMiddleware, eCommerceController.getUsers);

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(eCommerceValidator.createProduct),
    eCommerceController.createUser
  );

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(eCommerceValidator.validateUpdateStock),
    eCommerceController.updateStock
  );

  // Delete user
  route.delete(
    '/:id',
    authenticationMiddleware,
    eCommerceController.deleteUser
  );
};
