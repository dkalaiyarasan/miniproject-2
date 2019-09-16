const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
//const flash = require('connect-flash');
//const session = require('express-session');


//mongoose.connect(config.database);
mongoose.connect("mongodb://localhost/foodcourt", { useNewUrlParser: true });

let db = mongoose.connection;

//db.CacheItems.remove({ "Expiration" : { "$lte" : new Date() } });

//check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
});

 
//check for DB errors
db.on('error',function(err){
    console.log(err);
});

//init app
const index = express();

//Bring in Models
 let Additems = require('./modules/additems');
 let User = require('./modules/user');
 let order = require('./modules/cart');



 //load view engine
index.set('views',path.join(__dirname,'views'));
index.set('view engine','pug');

// Body Parser MiddleWare 
// parse application/x-www-form-urlencoded
index.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
index.use(bodyParser.json());
 


//Set public folder
index.use(express.static(path.join(__dirname, 'public'))); 

index.get('/',function(req,res){
    Additems.find({}, function(err, additems){
        if(err){
            console.log(err);
        }
        else{
           res.render('hello',{
               title:'Menu',
               additems: additems
           });
         }
       
    
 });
});


//get single additems
index.get('/additem/:id',function(req,res){
    Additems.findById(req.params.id,function(err,additem){
        res.render('additem',{
            additem:additem
        });
    });
});


//Honme ROute
index.get('/',function(req,res){
    Additems.find({}, function(err, additems){
       if(err){
         console.log(err);
        } else {
            res.render('hello',{
                title:'menu',
                //additems:additems
            });

        }
    });
});

//add Route
index.get('/additems/add',function(req,res){
    res.render('add_items',{
        title:'Add fooditem'
    });
});

//Add a submit to post route
index.post('/additems/add',function(req,res){
    let additem = new Additems;
    console.log(additem);
    additem.title = req.body.title;
    additem.item = req.body.item;
    additem.price = req.body.price;
    additem.Quanity = req.body.Quanity;
    //additem.body = req.body.body;
    console.log(additem);
 
    additem.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});
//get edit additems
index.get('/additem/edit/:id',function(req,res){
    Additems.findById(req.params.id,function(err,additem){
        res.render('edit_additems',{
            additem:additem
        });
    });
});


//update submit to post route
index.post('/additems/edit/:id',function(req,res){
    let additem = {};
    additem.title = req.body.title;
    additem.item = req.body.item;
    additem.price = req.body.price;
    additem.Quanity = req.body.Quanity;
    
    
    let query = {_id:req.params.id}

    Additems.update(query,additem,function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//try order conform 
//using get method
index.get('/additem/order/:id',function(req,res){
    
    Additems.findById(req.params.id,function(err,additem){
        console.log(additem);
        res.render('additem',{
            additem:additem
        });
    });
});

//using post method
index.post('/additems/order/:id',function(req,res){
    let additem = {};
    var totalQuanity;
    
    totalQuanity = req.body.totalQuanity;
    
    console.log(totalQuanity);
    
    Additems.findById(req.params.id,function(err,additem){
        var count = 0;
        var totalprice = 0;
        if(Quanity==totalQuanity)
        {
            count++;
            Quanity--;
            totalprice=totalQuanity*price;
        }
        else{
            res.render('/');
        }

    });
    
    

});

/*
// use for cart model in saving product

index.get('/cart/add',function(req,res){
    res.render('add_cart',{
        title:'addtocart'
    });

});

// use to cart in post method

index.post('/cart/add',function(req,res){
    let carts = new cart;
    carts.totalQuanity = req.body.totalQuanity;
});
*/
//Delete additems
index.delete('/additem/:id',function(req,res){
    //db.CacheItems.remove({ "Expiration" : { "$lte" : new Date() } });
    
    let query = {_id:req.params.id}

    Additems.remove(query,function(err){
        if(err){
            console.log(err);
        }
        res.send('success');
    });
});

index.post('/additem/:id',function(req,res){
    let query = {_id:req.params.id}

    Additems.remove(query,function(err){
        if(err){
            console.log(err);
        }
        res.send('success');
    });
});
/*
//register page for user get
index.get('/users/add',function(req,res){
    res.render('register',{
        title:'Add fooditem'
    });
});

//register page for user in post
index.post('/users/add',function(req,res){
    let user=new User;
    user.name = req.body.name;
    user.email = req.body.email;
    user.userName = req.body.username;
    user.password = req.body.password;
    user.password2 = req.body.password2;
    user.Location = req.body.Location;
    
    user.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/login')
            console.log('Login successfully');
        }
    });
});

*/
// Route files

//let additems = require('./routes/additem');
let users = require('./routes/users');
//index.use('/additems', additems);
index.use('/users', users);

 //start server
 index.listen(3000,function(){
    
 });
