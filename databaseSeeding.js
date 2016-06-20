var db = require('./models')

// db.plant.create({
//     name:'Grape',
//     number: 0,
//     edible: true
// });
db.plant.findAll().then(function(plants){
    console.log(plants);
})
