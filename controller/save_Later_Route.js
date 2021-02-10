const express= require('express');
const ObjectId= require('mongoose').Types.ObjectId;

// Local imports
const {SaveLater}= require('../models/save_later_model');

const router= express.Router();

// Get all data
router.get('/', (req, res) => {
    SaveLater.find((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log('Error in retriving Employees: '+JSON.stringify(err, undefined, 2));
        }
    });
})

// Add data
router.post('/', (req, res) => {
  
    const saveLater= new SaveLater({
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

    saveLater.save((err, doc) => {
        if(!err) {
          res.send(doc);
        }
        else {
            console.log('Error in adding data: '+JSON.stringify(err, undefined, 2));
        }
    });

});

// Delete data
router.delete('/:id', (req, res) => {

    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No item with id: ${req.params.id}`);
    }

    SaveLater.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log('Error in deleting employee: '+JSON.stringify(err, undefined, 2));
        }
    });

})

module.exports= router;