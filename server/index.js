var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require ('./api');

var clientPath = path.join(__dirname, '../client');
var app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) { return false; }
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}

app.get('*', function(req, res, next) {
    if (isAsset(req.url)) {
        return next(); //Call the next route handler
    } else {
        res.sendFile(clientPath + '/index.html');
    }
});

app.listen(3000);
