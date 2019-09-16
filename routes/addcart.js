var express = require('express');
var router = express.Router();
var Cart = require('../modules/cart');

var Product = require('../modules/additems');

/*Get home page. */
router.get('/',function(req,res,next){
    Product.find(function (err,docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0;i<docs.length;i+=chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));
        }
        res.render('/shop', {title: 'shopping Cart',products:productChunks});
    });
});
router.get('/add-to-cart/:id',function(req,res,next){
    var productId = req.params.id;
    var cart = new cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId,function(req,res,next){
        if(err) {
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

module.exports = router;