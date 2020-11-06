const express = require('express');
const bodyParser = require('body-parser');
const { dbConnect, session } = require('./helpers');

dbConnect.connect();

const app = express();

app.use(bodyParser.json());
app.use(session);
app.use(require('./routes/functional.js'));
app.use('/user', require('./routes/user.js'));
app.use('/item', require('./routes/item.js'));

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use((req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json('Page Not found');
    return;
  }

  res.type('txt').send('Page Not found');
});

app.listen(3000, () => {
  console.log('Server is live!');
});
