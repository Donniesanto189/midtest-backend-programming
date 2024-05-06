const eCommerceRespository = require('./e-commerce-respository');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { stock } = require('../../../models/product-Schema');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await eCommerceRespository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      namnameProducte: user.nameProduct,
      price: user.price,
    });
  }

  return results;
}

/**
 * Create new user
 * @param {string} nameProduct - Name
 * @param {string} price - price
 * @param {string} stock - stock
 * @returns {boolean}
 */
async function createUser(nameProduct, price, stock) {
  try {
    await eCommerceRespository.createUser(nameProduct, price, stock);
  } catch (err) {
    return null;
  }

  return true;
}

async function updateStock(nameProduct, newStock) {
  try {
    return await eCommerceRespository.updateStockByName(nameProduct, newStock);
  } catch (error) {
    throw error;
  }
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await eCommerceRespository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await eCommerceRespository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  createUser,
  updateStock,
  deleteUser,
};
