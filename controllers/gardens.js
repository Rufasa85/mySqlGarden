var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req,res) {
    var lowerCasedName = req.query.name.toLowerCase();
    if(lowerCasedName || req.query.color) {
        var filterPlants = [];
        if(lowerCasedName) {
            db.plant.findAll({
                where:{
                    name: {
                        $like: '%' + lowerCasedName + '%'
                    }
                }
            }).then(function(plants) {
                if(req.query.color) {
                    if(typeof req.query.color === 'array'){
                        for (var i = 0; i < plants.length; i++) {
                            for (var j = 0; j < req.query.color.length; j++) {
                                if(plants[i].color === req.query.color[j]) {
                                    filterPlants.push(plants[i]);

                                }
                            }
                        }
                        res.send(filterPlants);
                    }
                    else {
                        for (var i = 0; i < plants.length; i++) {
                            if (plants[i].color === req.query.color) {
                                filterPlants.push(plants[i]);
                            }
                        }
                        res.send(filterPlants);
                    }
                }
                else{
                    res.send(plants);
                }
            })
        }
        else if(req.query.color) {
            if (typeof req.query.color === 'array') {
                db.plant.findAll().then(function(plants) {
                    for (var i = 0; i < plants.length; i++) {
                        for (var j = 0; j < req.query.color.length; j++) {
                            if(plants[i].color === req.query.color[j]) {
                                filterPlants.push(plants[i]);
                            }
                        }
                    }
                    res.send(filterPlants);
                })
            }
            else {
                db.plant.findAll({where:{color: req.query.color}}).then(function(plants) {
                    res.send(plants);
                })
            }
        }
        // res.send(req.query);
    }
    else {
        db.plant.findAll().then(function(plants) {
            res.render('gardens/index', {plants:plants});
        })
    }
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
        water:0,
        edible:edible
    }).then(function(plant) {
        res.redirect('/garden')
    });
})

router.get('/:id', function(req,res) {
    db.plant.findById(req.params.id).then(function(plant){
        console.log('water:', plant.water)
        res.render('gardens/show',{plant:plant});
    })
})

router.get('/:id/edit', function(req, res) {
    db.plant.findById(req.params.id).then(function(plant){
        res.render('gardens/edit', {plant:plant});
    })
})

router.get('/:id/water', function(req, res) {
    db.plant.findById(req.params.id).then(function(plant) {
        if(plant.water<25) {
            plant.water++;
            plant.save();
        }
        res.redirect('/garden/' + plant.id);
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
