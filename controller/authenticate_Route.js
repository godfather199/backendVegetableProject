const express= require('express');
const jwt= require('jsonwebtoken');

// Local imports
const {Authenticate}= require('../models/authentication_model');

const router= express.Router();


// Register user
router.post('/register', (req, res) => {

    Authenticate.findOne({email: req.body.email}, (err, container) => {

        if(!container) {
          
          const authenticate= new Authenticate({
             userName: req.body.userName,
             phone: req.body.phone,
             email: req.body.email,
             address: req.body.address,
             password: req.body.password
            });

            authenticate.save((err, data) => {
               if(err) {
                 console.log(err);
                }
                else {
                  let payload= {
                    subject: data._id
                  };

                  let token= jwt.sign(payload, 'secretKey');
                  res.status(200).send({token});
                }
            });

        }
        else {
          res.status(401).send('Email already Exists');
        }

    });
    
});

// Login user
router.post('/login', (req, res) => {
  
    Authenticate.findOne({email: req.body.email}, (err, data) => {
      
      if(err) {
        console.log(err);
      }
      else {
        if(!data) {
          res.status(401).send('Invalid email');
        }
        else {
          if(data.password !== req.body.password) {
            res.status(401).send('Invalid password');
          }
          else {
            let payload= {
              subject: data._id
            };

            let token= jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
          }
        }
      }

    });

});

// Token-Verification Middleware
function tokenAuthenticate(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }

  let token= req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    return res.status(401).send('Unauthorized request');
  }

  let payload= jwt.verify(token, 'secretKey');
  if(!payload) {
    return res.status(401).send('Unauthorized request');
  }

  req.userId= payload.subject;
  next();
}

// Verify token
router.get('/token', tokenAuthenticate, (req,  res) => {
  res.status(200).json({msg: 'Authenticated'});
})

module.exports= router;

