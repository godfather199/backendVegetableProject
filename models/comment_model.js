const { model } = require('mongoose');
const mongoose= require('../db');

const Comment= mongoose.model('Comment', {
    name: {type: String},
    title: {type: String},
    comment: {type: String}
});

module.exports= {Comment};