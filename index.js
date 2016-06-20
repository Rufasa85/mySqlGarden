var express = require('express');
var app = express();
var db = require('./models/');
var gardenController = require('./controllers/gardens.js')

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static/'));

app.get('/', function(req, res) {
    res.render('index')
});

app.use('/garden', gardenController);

app.listen(3000);
