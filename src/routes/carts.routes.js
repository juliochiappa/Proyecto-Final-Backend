import {Router} from 'express';
import cartManager from '../logic/cartsManager.js';

const cartsRouter = Router();

cartsRouter.get('/', cartManager.getAllCarts);
cartsRouter.post('/', cartManager.createCart);
cartsRouter.get('/:cid', cartManager.getCartById);
cartsRouter.post('/:cid/product/:pid', cartManager.addProductToCart);


 export default cartsRouter;