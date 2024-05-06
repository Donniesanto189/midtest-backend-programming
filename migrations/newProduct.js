const logger = require('../src/core/logger')('api');
const { market } = require('../src/models/product');

const nameProduct = 'shampoo';
const price = '50000';
const stock = '2000';

logger.info('Creating default users');

(async () => {
  try {
    const numMarket = await market.countDocuments({
      nameProduct,
      price,
      stock,
    });

    if (numMarket > 0) {
      throw new Error(`product ${nameProduct} already exists`);
    }
    const product = await market;
    await product.create({
      nameProduct,
      price,
      stock,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
