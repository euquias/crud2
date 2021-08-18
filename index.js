const express = require('express');
const consign = require('consign')
const app = express();
const db = require('./config/db')
app.db = db
/*
app.get('/signin', function (req, res, next ) {
   res.send('ESTAMOS AQUI');
   console.log('RES-->', res);
   console.log('REQ-->', req);
})
*/
consign()
    .then('./config/middlewares.js')
    .then('./api/validestion.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3001, () =>{
    console.log('backende executando...')
})