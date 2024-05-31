import { Router } from 'express';
import config from '../config.js';
import CartManager from '../dao/cartsManager.js';


const cartsRouter = Router();
const manager = new CartManager();

cartsRouter.get('/', async (req, res) => {
    try {
        const process = await manager.getAllCarts();

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const process = await manager.addCarts(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

cartsRouter.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await manager.updateCarts(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = req.params.cid;
        const product = req.params.pid;
        
    res.status(200).send({ origin: config.SERVER, payload: `Desea agregar 1 unidad del producto ${product} al carrito ${cart} ?` });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

cartsRouter.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await manager.deleteCarts(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const filter = { _id: req.params.id }; 
        const process = await manager.deleteCartItem(filter); 

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


export default cartsRouter;