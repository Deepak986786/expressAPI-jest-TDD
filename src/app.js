const express = require('express');

const User = require('../src/user/User');

const app = express();
require('dotenv').config();

app.post('/api/1/users', (req, res) => {
  console.log(req.body);
  User.create(req.body).then(() => {
    return res.send({ message: 'User created' });
  });
});
module.exports = app;
