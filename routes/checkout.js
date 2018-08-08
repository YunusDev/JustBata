const express = require('express');

const router = express.Router();

const Product = require('../models/Product');


router.get('/', function (req, res) {

    res.render('user/checkout/index')

});


module.exports = router;