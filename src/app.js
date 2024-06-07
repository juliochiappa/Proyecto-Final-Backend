import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';
//import FileStore from 'session-file-store';



import config from './config.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import usersRouter from './routes/users.routes.js';
import cookiesRouter from './routes/cookies.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import viewRouter from './routes/views.routes.js';
import initSocket from './sockets.js';

const app = express();


const expressInstance = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`App activa en puerto ${config.PORT} enlazada a ddbb Atlas`);
});
const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET));
app.use(flash());

//const fileStorage = FileStore(session);
app.use(session({
    //store: new fileStorage({ path: './sessions', ttl: 15, retries: 0 }),
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI, ttl: 15 }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

 //Uso de plantilla de Handlebars
app.use('/', viewRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/cookies', cookiesRouter);
app.use('/api/session', sessionRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));


app.get('/', (req, res) => {
    res.send(`
    <h1>¡Bienvenido a mi segunda entrega del Proyecto Final!</h1>
    <ul>
    <h2>Servidor express activo en puerto ${config.PORT}<h2>
    <ul>
    `);
  });

