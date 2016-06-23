var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req,res) {
    db.plant.findAll().then(function(plants) {
        res.render('gardens/index', {plants:plants});
    })
})

router.get('/new', function(req, res) {
    res.render('gardens/new');
})

router.post('/new', function(req,res) {
    var edible = false;
    if (req.body.edible === 'true') {
        edible = true;
    }
    db.plant.create({
        name:req.body.name,
        color:req.body.color,
        edible:edible
    }).then(function(plant) {
        res.redirect('/garden')
    });
})

router.get('/:id', function(req,res) {
    db.plant.findById(req.params.id).then(function(plant){
        res.render('gardens/show',{plant:plant});
    })
})

router.get('/:id/edit', function(req, res) {
    db.plant.findById(req.params.id).then(function(plant){
        res.render('gardens/edit', {plant:plant});
    })
})

router.post('/:id/edit', function(req, res) {
    db.plant.findById(req.params.id).then(function(plant) {
        plant.name = req.body.name;
        plant.color = req.body.color;
        plant.edible = req.body.edible;
        plant.save().then(function(){
            res.redirect('/garden')
        })
    })
})

router.delete('/:id', function(req,res) {
    db.plant.findById(req.params.id).then(function(plant) {
        plant.destroy().then(function(){
            res.send('deleted');
        })
    })
})

module.exports = router;
