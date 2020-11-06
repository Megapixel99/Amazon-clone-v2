require('./env.js');

const sessionSecret = process.env.AUTH_STRING;
const mongoConnectString = process.env.MONGO_URL;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

if (!sessionSecret || !mongoConnectString) {
  console.log('Please set up all of your enviroment variables');
  console.log('Process exited with code: 1');
  process.exit(1);
}

module.exports = session({
  cookie: {
    httpOnly: false,
    path: '/',
    secure: false,
    store: new MongoStore({ url: mongoConnectString }),
  },
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
});
