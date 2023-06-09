const express = require('express');

const User = require('../src/user/User');

const app = express();
require('dotenv').config();
app.use(express.json());
app.post('/api/1/users', (req, res) => {
  User.create(req.body).then(() => {
    return res.send({ message: 'User created' });
  });
});
module.exports = app;
