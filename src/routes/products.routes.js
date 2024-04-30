import {Router} from 'express';
import productManager from '../logic/productsManager.js';

const productsRouter = Router();

productsRouter.get('/', productManager.getAllProducts);
productsRouter.get('/:pid', productManager.getProductById);
productsRouter.post('/', productManager.addProduct);
productsRouter.put('/:pid', productManager.updateProduct);
productsRouter.delete('/:pid', productManager.deleteProduct);


export default productsRouter;
