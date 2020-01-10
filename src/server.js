'use strict';

const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const express = require('express')

const app = express();
const usuarioRouter = require('./routers/usuarioRouter');
const trabajadorRouter = require('./routers/trabajadorRouter');
const cargoRouter = require('./routers/cargoRouter');

app.set('port',process.env.PORT || 4600);
app.use(fileUpload());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/usuario',usuarioRouter.router);
app.use('/trabajador',trabajadorRouter.router);
app.use('/cargo',cargoRouter.router);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}: ${colors.green('Online')}`)
})