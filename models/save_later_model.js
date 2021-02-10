const mongoose= require('../db');

var SaveLater= mongoose.model('SaveLater', {
    totalItems: {type: Number},
    currentProduct: {
        id: {type: String},
        title: {type: String},
        url: {type: String},
        thumbnailUrl: {type: String},
        name: {type: String},
        email: {type: String},
        body: {type: String},
        productName: {type: String},
        price: {type: Number}
    }
});

module.exports= {SaveLater};