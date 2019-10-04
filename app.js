const express = require('express');
const jwt = require('jsonwebtoken');
const BodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

//comment to get rid of the database hassle

/*

mongoose.connect('mongodb://localhost/internship', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to Db');
});

const userModel = Mongoose.model("User", {
    username:{
      type:String,
      unique: true   //make the username Unique
    }
    password: String
});

*/



app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/api/actors', (req, res) => {
 return res.json({
    name: 'Md.Shakil Moharram',
    birthday: '10-03-1995',
    country: 'Bangladesh'
  });
});

app.get('/api/movies', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
            title: 'Codding Challange',
            year: '2019',
            rating: '5 Star',
            actor:{
                name: 'Md.Shakil Moharram',
                birthday: '10-03-1995',
                country: 'Bangladesh'
            },
           
          
        });
      }
    });
  });


  app.post('/api/user/signup', (req, res) => {
    
    const user = {
       
      username: req.body.username,
      password: req.body.password
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '100s' }, (err, token) => {
      res.json({
        token
      });
    });
  });

  app.post('/api/user/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: req.body.username,
      password: req.body.password
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token
      });
    });
  });


  function verifyToken(req, res, next) {
  
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined') {
      
      const bearer = bearerHeader.split(' ');
      
      const bearerToken = bearer[1];
      
      req.token = bearerToken;
      
      next();
    } else {
    
      res.sendStatus(403);
    }
  
  }





app.listen(3000, () => console.log('Server started on port 3000'));