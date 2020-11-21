const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  full_name: String,
  prefix: String,
  gender: String,
  email: String,
  phone_number: Number,
  password: String,
  mfa: Boolean,
  business: {
    active: Boolean,
    items: Array,
  },
  lists: Array,
  orders: [String],
  picture: {
    profile: String,
    background: String,
  },
  address: String,
  payments: Array,
  secret: String,
});

const itemSchema = mongoose.Schema({
  uuid: String,
  seller: String,
  name: String,
  price: Number,
  currency: String,
  description: String,
  reviews: Array,
});

module.exports = {
  item: mongoose.model('item', itemSchema),
  account: mongoose.model('account', accountSchema),
};
