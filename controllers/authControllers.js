const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

class AuthControllers {
  
  me(req, res, next){
    res.json(req.session.currentUser);
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    console.log(req.session.currentUser)
    try {
      const user = await User.findOne({username});
      if(!user) {
        const err = new Error('Not Found');
        err.status = 404;
        err.statusMessage = 'Not Found';
        next(err)
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      else {
        const err = new Error('Unauthorized');
        err.status = 401;
        err.statusMessage = 'Unauthorized';
        next(err);
      }
    }
    catch(err) {
      console.log(err)
    }
  }

   signup (req, res, next){
    const { username, password } = req.body;
  
    User.findOne({
        username
      }, 'username')
      .then((userExists) => {
        if (userExists) {
          const err = new Error('Unprocessable Entity');
          err.status = 422;
          err.statusMessage = 'username-not-unique';
          next(err);
        }
  
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const newUser = new User({
          username,
          password: hashPass,
        });
  
        return newUser.save().then(() => {
          // TODO delete password 
          req.session.currentUser = newUser;
          res.status(200).json(newUser);
        });
      })
      .catch(next);
  }

  logout(req, res, next) {
    req.session.destroy();
    return res.status(204).send();
  }
   
}

const authControllers = new AuthControllers
module.exports = authControllers;