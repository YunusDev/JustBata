const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

const Cart = require('../models/Cart');


router.get('/', function (req, res) {

    Product.find().populate('user').then(function (products) {

        res.render('user/shop/index', {title: 'Shop Now!', products: products});

    });


});

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        req.flash('msg_success', 'Item Added');
        res.redirect('/shop');
    });
});

router.get('/show', function (req, res) {

    res.render('user/shop/show')

});


module.exports = router;