/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

const User = require('./users.js');
const authMiddleware = require('./auth-middleware.js');

router.post('/signup', signup);
router.post('/signin', authMiddleware, signin);

function signup(req, res, next) {
  console.log('here');
  let user = new User(req.body);
  user.save()
    .then(validUser => {
      req.token = user.tokenGenerator(validUser);
      console.log('after here',req.token);
      req.user = validUser;
      res.status(200).send(req.token);
    })
    .catch(next);
}

function signin(req, res, next) {
  res.send(req.token);
}

module.exports = router;