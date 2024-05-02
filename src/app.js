import express from 'express';
import handlebars from 'express-handlebars';
import config from './config.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.routes.js';
import initSocket from './sockets.js';

const app = express();

const expressInstance = app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
});
const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

 //Uso de plantilla de Handlebars
app.use('/', viewRouter);

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

