const { market } = require('../../../models/product');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return market.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return market.findById(id);
}

/**
 * Create new user
 * @param {string} nameProduct - Name
 * @param {string} price - price
 * @param {string} stock - stock
 * @returns {Promise}
 */
async function createUser(nameProduct, price, stock) {
  return market.create({
    nameProduct,
    price,
    stock,
  });
}

/**
 * update stock
 * @param {string} nameProduct
 * @param {number} newStock
 * @returns
 */
async function updateStockByName(nameProduct, newStock) {
  try {
    const product = await market.findOne({ nameProduct });
    if (!product) {
      throw new Error('Product not found');
    }
    product.stock = newStock;
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return market.deleteOne({ _id: id });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateStockByName,
  deleteUser,
};
