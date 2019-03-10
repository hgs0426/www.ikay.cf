const express = require('express');
const path = require('path');
const config = require(path.join(__dirname, 'config.json')).web;
const routers = require(path.join(__dirname, 'routers'));
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', routers);
app.listen(config.port, () =>{
  console.log(`www.ikay.cf started on port ${config.port}!`)}
);