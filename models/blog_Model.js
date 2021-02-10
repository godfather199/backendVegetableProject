const mongoose= require('../db');

// Create blog model
const Blog= mongoose.model('Blog', {
    author: {type: String},
    title: {type: String},
    description: {type: String}
});

module.exports= {Blog};