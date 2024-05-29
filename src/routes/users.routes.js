import { Router } from 'express';
import config from '../config.js';
import userModel from '../dao/models/users.model.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
    try {
        const process = await userModel.paginate({role: 'user'}, {page: 1, limit: 10});
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

usersRouter.post('/', async (req, res) => {
    try {
        const process = await userModel.create(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

usersRouter.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await userModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

usersRouter.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await userModel.findOneAndDelete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


export default usersRouter;
