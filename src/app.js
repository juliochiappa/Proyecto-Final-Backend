import express from 'express';
import config from './config.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));


app.get('/', (req, res) => {
    res.send(`
    <h1>¡Bienvenido a mi primer entrega del Proyecto Final!</h1>
    <ul>
    <h2>Servidor express activo en puerto ${config.PORT}<h2>
    <ul>
    `);
  });

app.listen(config.PORT, () => {
    console.log(`Servidor express activo en puerto ${config.PORT}`);
});