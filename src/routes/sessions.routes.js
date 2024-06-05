import { Router } from 'express';

import config from '../config.js';

const sessionRouter = Router();

sessionRouter.get('/counter', async (req, res) => {
    try {
        if (req.session.counter) {
            req.session.counter++
            res.status(200).send({ origin: config.SERVER, payload: `El sitio ha sido visitado ${req.session.counter} veces` });
        } else {
            req.session.counter = 1;
            res.status(200).send({ origin: config.SERVER, payload: `Bienvenido a nuestro sitio!!` });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

const adminAuth = (req, res, next) => {
    if (req.session.user?.role !== 'admin')
        return res.status(401).send({ origin: config.SERVER, payload: 'Acceso no autorizado: se requiere autenticación y nivel de admin' });

    next();
}

sessionRouter.post('/register', async (req, res) => {
    try {
        const { email } = req.body;

        if (req.session.user && req.session.user.email === email) {
            return res.status(401).send({ origin: config.SERVER, payload: `Ya hay un usuario autenticado con el correo electrónico ${email}` });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

sessionRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const savedFirstName = 'Julio';
        const savedLastName = 'Chiappa';
        const savedEmail = 'jchiappa@gmail.com';
        const savedPassword = 'abc123';
        const savedRole =  'user';
        
        
        if ( email !== savedEmail || password !== savedPassword) {
            return res.status(401).send({ origin: config.SERVER, payload: `Los datos de acceso no son válidos` });
        } 
        req.session.user = {firstName: savedFirstName, lastName: savedLastName, email: savedEmail, role: savedRole};
        res.redirect('/realtime_products');
        //res.status(200).send({ origin: config.SERVER, payload: `Bienvenido a nuestro sitio!!` });
    
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

sessionRouter.get('/private', adminAuth, async (req, res) => {
    try {
        if (req.session.user.role !== 'admin') {

        return res.status(401).send({ origin: config.SERVER, payload: `Se necesita ser ADMIN para poder ingresar` });
        } 

        res.status(200).send({ origin: config.SERVER, payload: `Bienvenido ADMIN !!` });
    
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

sessionRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
            res.redirect('/login');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default sessionRouter;