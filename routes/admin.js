var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helper'); 

/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelper.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});
  })

  
});

router.get('/add-product',function(req,res){

  res.render('admin/add-product');
});

router.post('/add-product',(req,res)=>{

  console.log("kkkkk",req.body);

  productHelper.addProduct(req.body,(id)=>{
    let image = req.files.Image

    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product");
      }
    })
    
  });

});
module.exports = router;
