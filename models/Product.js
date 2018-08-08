const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newProduct = new Schema({

    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('products', newProduct);