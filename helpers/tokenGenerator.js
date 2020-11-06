const jwt = require('jsonwebtoken');
require('./env.js');

const token = jwt.sign({
  username: process.env.TOKEN,
},
process.env.TOKEN);

console.log(token);
