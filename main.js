const express = require('express');
const path = require('path');
const cors = require('cors');

const config = require(path.join(__dirname, 'config.json')).web;

const app = express();
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'public','html','index.html'));

});

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))