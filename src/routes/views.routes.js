import {Router} from 'express';
import {data} from '../data.js';

const viewRouter = Router();


viewRouter.get('/welcome', (req, res) => {
    const user= { name: 'Julio Cesar CHIAPPA' }
    res.render('index', user );
});

viewRouter.get('/list', (req, res) => {
    const users = { users: data };
    res.render('users', users);
});

export default viewRouter;