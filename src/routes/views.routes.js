import {Router} from 'express';
import {data, product} from '../data.js';
import fs from 'fs';
import path from 'path';
import config from '../config.js';

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
    const productsFilePath = path.join(config.DIRNAME, './files/products.json');
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de productos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const productList = JSON.parse(data);
            res.render('home', { products: productList });
        } catch (parseError) {
            console.error('Error al analizar el archivo JSON de productos:', parseError);
            return res.status(500).send('Error interno del servidor');
        }
    });
});

viewRouter.get('/realtime_products', (req, res) => {
    const productsFilePath = path.join(config.DIRNAME, './files/products.json');
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de productos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const productList = JSON.parse(data);
            res.render('realtime_products', { products: productList });
        } catch (parseError) {
            console.error('Error al analizar el archivo JSON de productos:', parseError);
            return res.status(500).send('Error interno del servidor');
        }
    });


});

export default viewRouter;