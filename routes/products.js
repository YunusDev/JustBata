const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

const multer = require('multer');

const multerConfig = {

    storage: multer.diskStorage({
        //Setup where the user's file will go
        destination: function(req, file, next){
            next(null, './public/products');
        },

        //Then give the file a unique name
        filename: function(req, file, next){
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, Date.now() + '-' + file.originalname);
        }
    }),

    //A means of ensuring only images are uploaded.
    fileFilter: function(req, file, next){
        if(!file){
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if(image){
            console.log('photo uploaded');
            next(null, true);
        }else{
            console.log("file not supported");

            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};


router.get('/', function (req, res) {

    Product.find().populate('user').then(function (products) {

        res.render('admin/product/index', {products: products});

    });


});

router.get('/create', function (req, res) {

    res.render('admin/product/create');

});


router.post('/create', multer(multerConfig).single('image'),  function (req, res) {


    const newProduct = Product ({

        name: req.body.name,
        price: req.body.price,
        user: req.user.id,
        image: '/products/' + req.file.filename,
        description: req.body.description

    });

    newProduct.save().then(function (user) {

        req.flash('msg_success', 'Product has been created successfully');
        res.redirect('/admin/products');

    });


});

module.exports = router;
