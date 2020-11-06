// written by Seth Wheeler
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
require('./env.js');

const credentials = {
    cert: fs.readFileSync('./sslcert/archive/pixelbearsoftware.com/fullchain1.pem'),
    key: fs.readFileSync('./sslcert/archive/pixelbearsoftware.com/privkey1.pem')
};

const app = express();

app.set('json spaces', 2);
app.use(require('helmet')());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({origin:true,credentials: true}));

app.use(express.static('./static'));
app.use('/static/images', express.static(path.resolve('../WebClient/images')));

app.use(bodyParser.json());
app.use(require('./session.js'));
app.use(require('./Routes/functionalRoutes.js'));
app.use('/user', require('./Routes/userRoutes.js'));
app.use('/admin', require('./Routes/adminRoutes.js'));
app.use('/media', require('./Routes/mediaRoutes.js'));
app.use('/super-admin', require('./Routes/superAdminRoutes.js'));
app.use('/media', require('./Routes/mediaRoutes.js'));

app.use('/images', express.static('./Images'));

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

const httpsServer = https.createServer(credentials, app);

if (env === 'dev') {
  // const httpServer = http.createServer(app);
  // httpServer.listen(80);
}

httpsServer.listen(443);
