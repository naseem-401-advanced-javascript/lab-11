'use strict';
const express = require('express');
const morgan = require('morgan');

//auth
const basicMidAuth = require('./basic-mid-auth.js');
const users = require('./users.js');

const app = express();
app.use(express.json());

app.use(morgan('dev'));

const loggerRequest = require('./logger.js');
app.use(loggerRequest);

// err
const error404 = require('../middleware/404.js');
const error500 = require('../middleware/500.js');

app.use(error404);
app.use(error500);

///
app.post('/singup', (req, res) => {
    users.save(req.body)
        .then(user => {
            let token = users.generateToken(user);
            res.status(200).send(token);
        })
        .catch(err => console.error(err));
});

app.post('/singin', basicMidAuth, (req, res) => {
    res.status(200).send(req.token);
});

app.get('/user', basicMidAuth, (req, res) => {
    res.status(200).json(users.list);
});

module.exports = {
    server : app,
    start : port => {
      let PORT = port || process.env.PORT || 8080;
      app.listen(PORT , ()=> console.log(`Listening on Port No.${PORT}`));
    },
  };



