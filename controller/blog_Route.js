const express= require('express');

// Local imports
const {Blog}= require('../models/blog_Model');

const router= express.Router();

// Get all blog data
router.get('/', (req, res) => {
    Blog.find((err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});

// Get single blog data
router.get('/:id', (req, res) => {
    
    Blog.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

// Add blog data
router.post('/', (req, res) => {
  
    const blog= new Blog({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
    });

    blog.save((err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

// Update blog data
router.put('/:id', (req, res) => {

  const blog= {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description
  };

  Blog.findByIdAndUpdate(req.params.id, {$set: blog}, {new: true}, (err, data) => {
      if(err) {
          console.log(err);
      }
      else {
          res.status(200).send(data);
      }
  });

});

// Delete blog data
router.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});

module.exports= router;