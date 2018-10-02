var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./public/scripts/catch.js');

app.use(express.static('public'));
app.use('/db', db )
app.listen(8000);