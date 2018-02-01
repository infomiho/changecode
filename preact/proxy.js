const express = require('express');
const cors = require('cors')

const request = require('request');

const apiServerHost = 'http://52.233.158.172';

const app = express();
app.use(cors())

app.use('/', function (req, res) {
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);  