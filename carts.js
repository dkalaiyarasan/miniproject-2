 //try for order mongoose

 let mongoose = require('mongoose');
 
 //order schema

 let orderSchema = mongoose.schema({
     totalQuanity:{
         type:String,

     }
     
 });

 let cart = module.exports = mongoose.model('cart',orderSchema);