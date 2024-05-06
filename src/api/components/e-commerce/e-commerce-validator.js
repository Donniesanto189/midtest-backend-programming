const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createProduct: {
    body: {
      nameProduct: joi.string().required().label('Product Name'),
      price: joi.number().min(0).required().label('Price'),
      stock: joi.number().min(0).required().label('Stock'),
    },
  },

  validateUpdateStock: {
    body: {
      nameProduct: joi.string().required().label('Product Name'),
      newStock: joi.number().min(0).required().label('New Stock'),
    },
  },
};
