const jwt = require('jsonwebtoken');
require('./env.js');

const token = jwt.sign({
  token: process.env.TOKEN,
},
process.env.TOKEN);

console.log(token);
