import productModel from './models/products.models.js';

class ProductManager {
  constructor() {
  }
  
  getAllProducts = async (limit = 0) => {
    try {
        return limit === 0 ? await productModel.find().lean(): await productModel.find().limit(limit).lean();
    } catch (err) {
        return err.message;
    };
};

  getAllProductsAggregate = async () => {
      try {
        return await productModel.aggregate([
            { $match: { category: 'Nacional'}},
            { $group: {_id: '$description', totalStock: { $sum: '$stock'}}},
            { $sort: {totalStock: -1 }}
        ]);
      } catch (err) {
          return err.message;
      };
  };

  getProductById = async (id) => {
      try {
          return await productModel.findById(id).lean();
      } catch (err) {
          return err.message;
      };
  };

  addProduct = async (newData) => {
      try {
          return await productModel.create(newData);
      } catch (err) {
          return err.message;
      };
  };

  updateProduct = async (filter, update, options) => {
      try {
          return await productModel.findOneAndUpdate(filter, update, options);
      } catch (err) {
          return err.message;
      };
  };

  deleteProduct = async (id) => {
    try {
      return productModel.findOneAndDelete(id);
    } catch (err) {
      return err.message;
    };
  };
};

export default ProductManager;
