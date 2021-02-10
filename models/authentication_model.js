const mongoose= require('../db');

// Creating model
const Authenticate= mongoose.model('Authenticate', {
  userName: {type: String},
  phone: {type: Number},
  email: {type: String},
  address: {type: String},
  password: {type: String}
}); 

module.exports= {Authenticate};

