const express = require('express');
const router = express.Router();


//Bring in Models
let Additems = require('../modules/additems');

//home route


 
 //Add a Route
router.get('/add',function(req,res){
    res.render('add_items',{
    title:'additems',
        
 
 });
 });
 
 //Add Submit to Post Route
router.post('/add',function(req, res){

     
   req.checkBody('title','Tittle is required').notEmpty();
   req.checkBody('item','item is required').notEmpty();
   req.checkBody('price','price is required').notEmpty();
   req.checkBody('body','body is required').notEmpty();
 
     //Get Errors
   let errors = req.validationErrors();
 
     if(err){
         res.render('add_items', {
             title:'Add item',
             errors:errors
         });
        }
     else{
         let additems = new Additems();
         additems.title = req.body.title;
         additems.item = req.body.item;
         additems.price = req.body.price;
         additems.body = req.body.body;
 
    additems.save(function(errors){
        if(err){
            console.log(err);
            return;
        }
        else
        {
           //req.flash('success','Additems Addedd');
           res.redirect('/');
        }
    });
   }
});
  // Load edit form
router.get('/edit/:id', function(req,res){
    Additems.findById(req.params.id,function(err,additem){
        res.render('edit_additems',{
            title:'Edit Additem',
            additem:additem 
            });
        });
    });
 
 // Update to  Route
 
router.post('/edit/:id',function(req, res){
    let additem = {};
    additems.title = req.body.title;
    additems.item = req.body.item;
    additems.price = req.body.price;
    //additems.body = req.body.body;
 
    let query = {_id:req.params.id}
 
    Article.Update(query, additems, function(err){
        if(err){
            console.log(err);
            return;
        }
        else
        {
            //req.flash('success','Additem updated')
            res.redirect('/');
        }
    });
  });
 
 //Delete additems
 
router.delete('/:id', function(req,res){
      let query = { _id:req.params.id}
 
      Additems.remove(query, function(err){
          if(err){
              console.log(err);
          }
          res.send('success');
      });
  });
//single article
router.get('/:id', function(req,res){
    Additems.findById(req.params.id, function(err,additem){
        res.render('additem',{
            title:additems,
            additem:additem

        });
        });
    });

module.exports = router;
 
