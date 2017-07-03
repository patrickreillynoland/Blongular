var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require ('./api');

var clientPath = path.join(__dirname, '../client');
var app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(3000);
