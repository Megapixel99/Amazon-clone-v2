const bcrypt = require('bcrypt');

const saltRounds = 15;

function generate(plaintextPassword) {
  return (bcrypt.hashSync(plaintextPassword, saltRounds));
}

function compare(plaintextPassword, hash) {
  return (bcrypt.compareSync(plaintextPassword, hash));
}

module.exports = {
  compare,
  generate
};
