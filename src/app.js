import express from 'express';
import handlebars from 'express-handlebars';
import config from './config.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewRouter); //Uso de plantilla de Handlebars
app.use('/users', viewRouter);

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