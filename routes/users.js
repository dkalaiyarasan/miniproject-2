const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//const passport = require('passport');
//var expressValidator = require('express-validator');
//var api = express.Router();
//api.use (expressValidator());
//Bring from user model
let User = require('../modules/user');

//Register

router.get('/register',function(req, res){
  res.render('register');
});

//Register process

router.post('/register',function(req,res,errors){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const Location = req.body.Location;
  /*
  req.check('name','Name is required').notEmpty();
  req.check('email','Email is required').notEmpty();
  req.check('email','Email not valid').isEmail();
  req.check('username','Username is required').notEmpty();
  req.check('password','Password is required').notEmpty();
  req.check('password2','Password is donot match').equlas(req.body.password);
  req.check('Location','Location is required').notEmpty();
  */
  //let errors = req.validationErrors();
  
  if(errors){
      res.render('register', {
          errors:errors
      });

  } else {
      let newUser = new User({
          name:name,
          email:email,
          username:username,
          password:password,
          
          Location:Location
      });
      
      bcrypt.genSalt(10,function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err,hash){
          if(err){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function(err){
            if(err){
              console.log(err);
              return;
            } else {
              req.res('success','You are now registered and logon');
              req.redirect('/users/login');
            }
          });
        });
      }); 
     
    }
});

//Login form
router.get('/login',function(req,res,err){
  res.render('login');

});


module.exports = router;
