 let mongoose = require('mongoose');


//additems schema
let  additemsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    Quanity:{
        type: Number,
        required: true
    }
    
});

let Additems = module.exports = mongoose.model('Additems',additemsSchema); 