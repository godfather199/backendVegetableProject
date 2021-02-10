const express= require('express');
const {Detail}= require('../models/cart_model');
const ObjectId= require('mongoose').Types.ObjectId;

const router= express.Router();

// Get all Data
router.get('/', (req, res) => {
    
    Detail.find((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log('Error in retriving Employees: '+JSON.stringify(err, undefined, 2));
        }
    });

});

// Add Data
router.post('/', (req, res) => {
    
    var store= new Detail({
        totalItems: req.body.totalItems,
        currentProduct: {
            id: req.body.currentProduct.id,
            title: req.body.currentProduct.title,
            url:  req.body.currentProduct.url,
            thumbnailUrl:  req.body.currentProduct.thumbnailUrl,
            name:  req.body.currentProduct.name,
            email:  req.body.currentProduct.email,
            body:  req.body.currentProduct.body,
            productName:  req.body.currentProduct.productName,
            price:  req.body.currentProduct.price
        }
    });

    store.save((err, doc) => {
        if(!err) {
          res.send(doc);
        }
        else {
            console.log('Error in adding data: '+JSON.stringify(err, undefined, 2));
        }
    });

});

// Delete Data
router.delete('/:id', (req, res) => {
  
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No item with id: ${req.params.id}`);
    }

    Detail.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log('Error in deleting employee: '+JSON.stringify(err, undefined, 2));
        }
    });

});

module.exports= router;