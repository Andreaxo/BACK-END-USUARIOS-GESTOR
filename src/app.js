const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const profilePhoto = require('../src/modules/routesMulter.js')
const cors = require('cors');

const app = express();

// Carpetas
const clientes = require('./modules/routes.js');
const error = require('./network/errors.js');

// Middleware

app.use(cors());
app.use(morgan('dev')); // Este es para mirar que se ha necesitado de consultas.
app.use(express.json()); // Este middleware es para que reconozca los .json de las APIS.
app.use(express.urlencoded({ extended: true })); // Este middleware es también para reconocer datos codificados en formato application/x-www-form-urlencoded

// Configuración de puerto
app.set('port', config.app.port)


// Rutas
app.use('/api/clientes', clientes, profilePhoto);
app.use(error);



module.exports = app;