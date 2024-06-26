const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const Market = require('./components/e-commerce/e-commerce-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  Market(app);

  return app;
};
