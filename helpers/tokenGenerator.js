const jwt = require('jsonwebtoken');
require('dotenv').config({
  path: '../.env',
});

const token = jwt.sign({
  token: process.env.TOKEN,
},
process.env.TOKEN);

console.log(token);
