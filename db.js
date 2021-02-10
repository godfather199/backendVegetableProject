const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/CartDetail', (err) => {
    if(!err) {
        console.log('Connected to MongoDB');
    }
    else {
        console.log('Error in connecting to MongoDB: '+JSON.stringify(err, undefined, 2));
    }
});

module.exports= mongoose;