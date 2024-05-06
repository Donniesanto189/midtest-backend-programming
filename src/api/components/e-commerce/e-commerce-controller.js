const eCOmmerceService = require('./e-commerce-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const productRepository = require('./e-commerce-respository');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    const currentPage = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    let users = await eCOmmerceService.getUsers();

    // Sorting
    const sortingQuery = request.query.sort;
    if (sortingQuery) {
      const [sortField, sortOrder] = sortingQuery.split(':');
      if (sortField === 'email' || sortField === 'name') {
        users.sort((a, b) => {
          if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    // Searching
    const searchingQuery = request.query.search;
    if (searchingQuery) {
      const [searchField, searchKey] = searchingQuery.split(':');
      if (searchField === 'email' || searchField === 'name') {
        users = users.filter((user) =>
          user[searchField].toLowerCase().includes(searchKey.toLowerCase())
        );
      }
    }

    const totalItem = users.length;
    const totalPages = Math.ceil(totalItem / perPage);

    const result = users.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    response.status(200).json({
      Page_Number: parseInt(currentPage),
      Page_Size: parseInt(perPage),
      Count: parseInt(totalItem),
      Total_Pages: parseInt(totalPages),
      Has_Previous_Page: !!hasPreviousPage,
      Has_Next_Page: !!hasNextPage,
      Data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const nameProduct = request.body.nameProduct;
    const price = request.body.price;
    const stock = request.body.stock;

    const success = await eCOmmerceService.createUser(
      nameProduct,
      price,
      stock
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ nameProduct, price });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateStock(req, res) {
  try {
    const { nameProduct, newStock } = req.body;
    const updatedProduct = await eCOmmerceService.updateStock(
      nameProduct,
      newStock
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await eCOmmerceService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  updateStock,
  deleteUser,
};
