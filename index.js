const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');


AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

const CategoriasRouter = require('./categoria/routes/categoria.routes');
CategoriasRouter.categoriaRoutes(app);

const ProductosRouter = require('./productos/routes/producto.routes');
ProductosRouter.productoRoutes(app);

const ClientesRouter = require('./clientes/routes/cliente.routes');
ClientesRouter.clienteRoutes(app);

const CarritoRouter = require('./carrito/routes/carrito.routes');
CarritoRouter.carritoRoutes(app);


const server = app.listen(PORT, function () {
    console.log('app listening at port %s', PORT);
});


// Para RENDER
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
