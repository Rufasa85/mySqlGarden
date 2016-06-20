var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req,res) {
    res.render('gardens/index');
})

router.get('/new', function(req, res) {
    res.render('gardens/new');
})


router.get('/:id', function(req,res) {
    res.render('gardens/show');
})


module.exports = router;
