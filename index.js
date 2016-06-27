var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models/');
var gardenController = require('./controllers/gardens.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/static/'));

app.get('/', function(req, res) {
    res.render('index')
});

app.use('/garden', gardenController);

app.listen(process.env.PORT || 8080);
