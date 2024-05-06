const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const marketSchema = require('./product-Schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const market = mongoose.model('e-commerce', mongoose.Schema(marketSchema));

module.exports = {
  mongoose,
  market,
};
