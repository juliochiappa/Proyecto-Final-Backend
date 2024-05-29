import {Router} from 'express';
import {uploader} from '../uploader.js';
import config from '../config.js';
import ProductManager from '../dao/productsManager.js';


const productsRouter = Router();
const manager = new ProductManager();


productsRouter.get('/', async (req, res) => {
    try {
        const products = await manager.getAllProducts();
        
        res.status(200).send({ origin: config.SERVER, payload: products });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

productsRouter.get('/aggregate', async (req, res) => {
    try {
        const product = await manager.getAllProductsAggregate();
        
        res.status(200).send({ origin: config.SERVER, payload: product });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


productsRouter.get('/one/:id', async (req, res) => {
    try {
        const product = await manager.getProductById(req.params.id);

        res.status(200).send({ origin: config.SERVER, payload: product });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

productsRouter.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const process = await manager.addProduct(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });

        socketServer.emit('newProduct', req.body);
    } catch (err) {
        if (err.code === 11000) {
            res
              .status(400)
              .send({ error: "El código del producto ya está siendo utilizado" });
            } else {
                console.error(err);
                res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
        } 
    }
});

productsRouter.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await manager.updateProduct(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
}),

productsRouter.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await manager.deleteProduct(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default productsRouter;

