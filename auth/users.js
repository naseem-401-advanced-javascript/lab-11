/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;
console.log(SECRET)

const users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  return Promise.reject();
});

users.statics.authenticater = function (auth) {
  let query = { username: auth.user };
  return this.findOne(query)
    .then(user => {
      return user.passwordComparator(auth.pass);
    })
    .catch(console.error)
};

users.methods.passwordComparator = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null
    });
};

users.methods.tokenGenerator = function (user) {
  console.log('user.js', user)
  let token = {
    id: user._id,
  };
  return jwt.sign(token, SECRET);
};

module.exports = mongoose.model('users', users);

/// This Code based on class13 starter code