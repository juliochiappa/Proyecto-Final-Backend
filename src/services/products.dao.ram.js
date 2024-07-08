class ProductsService {
  constructor() {
    this.products = [
      { _id: 1, title: "Producto 1", price: 100.1, stock: 10 },
      { _id: 2, title: "Producto 2", price: 22, stock: 0 },
      { _id: 3, title: "Producto 3", price: 90.3, stock: 50 },
    ];
  }
  getAllProducts = async (filter, limit = 0, page = 1) => {
    try {
      if (limit === 0) {
        const product = this.products.find(
          (product) => product._id === filter._id
        );
        return product;
      } else {
        return await productModel.paginate(
          {},
          { page: page, limit: limit, lean: true }
        );
      }
    } catch (err) {
      return err.message;
    }
  };

  getProductById = async (filter) => {
    try {
      const product = this.products.find(
        (product) => product._id === filter._id
      );
      return product;
    } catch (err) {
      return err.message;
    }
  };

  addProduct = async (newData) => {
    try {
      this.products.push(newData);
    } catch (err) {
      return err.message;
    }
  };

  updateProduct = async (filter, update, options) => {
    try {
      const indexToUpdate = this.products.findIndex(
        (product) => product._id === filter._id
      );
      this.products[indexToUpdate] = update;
      return this.products[indexToUpdate];
    } catch (err) {
      return err.message;
    }
  };

  deleteProduct = async (filter) => {
    try {
      this.products = this.products.filter(
        (product) => product._id !== filter._id
      );
      return this.products;
    } catch (err) {
      return err.message;
    }
  };
}

export default ProductsService;
