import {Router} from 'express';
import {data, product} from '../data.js';

const viewRouter = Router();


viewRouter.get('/welcome', (req, res) => {
    const user= { name: 'Julio Cesar CHIAPPA' }
    res.render('index', user );
});

viewRouter.get('/users', (req, res) => {
     const users = { users: data };
     res.render('users', users);
});

viewRouter.get('/home', (req, res) => {
    const productList = {products: product}
    res.render('home', productList);
});

viewRouter.get('/realtime_products', (req, res) => {
    const proList = { products: product };
    res.render('realtime_products', proList);
});


export default viewRouter;