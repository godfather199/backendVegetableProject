const express= require('express');

const {Comment}= require('../models/comment_model');
const ObjectId= require('mongoose').Types.ObjectId;

const router= express.Router();

// Get data
router.get('/', (req, res) => {
    Comment.find((err, data)=> {
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in retriving from MongoDB: '+JSON.stringify(err, undefined, 2));
        }
    });
});

// Add data
router.post('/', (req, res) => {
    var comm= new Comment({
        name: req.body.name,
        title: req.body.title,
        comment: req.body.comment
    });

    comm.save((err, data) => {
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in adding to MongoDB: '+JSON.stringify(err, undefined, 2));
        }
    });

});

// Update data
router.put('/:id', (req, res) => {
  
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No data with id: ${req.params.id}`);
    }

    const comm= {
        name: req.body.name,
        title: req.body.title,
        comment: req.body.comment
    };

    Comment.findByIdAndUpdate(req.params.id, {$set: comm}, {new: true}, (err, data) => {
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in updating data in MongoDB: '+JSON.stringify(err, undefined, 2));
        }
    });

});

// Delete data
router.delete('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send( `No data with id: ${req.params.id}`);
    }

    Comment.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in deleting data from MongoDB: '+JSON.stringify(err, undefined, 2));
        }
    });

});

module.exports= router;