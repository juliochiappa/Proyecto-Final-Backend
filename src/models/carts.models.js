import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'carts';

const cartSchema = new mongoose.Schema({
  _user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
  products: { type: [{ _id: mongoose.Schema.Types.ObjectId, stock: Number }], required: true, ref: 'products'}
});

const cartModel = mongoose.model(collection, cartSchema);

export default cartModel;
