const router = require('express').Router();
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { models, validation, bcrypt } = require('../helpers');

router.get('/whoami', (req, res) => {
  if (req.session && req.session.email !== null && req.session.email !== undefined) {
    res.send(`Logged in as: ${req.session.email}`);
  } else {
    res.send('Currently not logged in');
  }
});

router.get('/search', (req, res) => {
  if (req.query.hasOwnProperty('q')) {
    models.item.find({
      name: req.query.q,
    }, null, {
      limit: req.query.limit,
    }).then((items) => {
      res.status(200).json({
        status: 200,
        items,
      });
    });
  } else {
    res.status(403).json({
      status: 403,
      message: 'No query found, use the query parameter \'q\' to set the query',
    });
  }
});

router.post('/signup', (req, res) => {
  const valid = validation.validateSignup(req.body);
  if (valid === null) {
    models.account.findOne({
      email: req.body.email,
    }).then((account) => {
      if (!account) {
        new models.account({
          full_name: req.body.full_name,
          prefix: null,
          gender: null,
          email: req.body.email,
          phone_number: null,
          password: bcrypt.generate(req.body.password),
          mfa: false,
          business: {
            active: false,
            items: [],
          },
          lists: [],
          orders: [],
          picture: {
            profile: null,
            background: null,
          },
          address: null,
          payments: [],
        }).save().then((newAccount) => {
          req.session.email = req.body.email;
          res.status(201).json({
            status: 201,
            message: 'Account created successfully',
            account: { email: newAccount.email },
          });
        }).catch((err) => {
          console.error(err);
          res.status(500).json({
            status: 500,
            message: 'An unknown error occured, we will investigate it as soon as possible',
          });
        });
      } else {
        res.status(403).json({
          status: 403,
          message: `An account with an email of: ${req.body.email} already exsists`,
        });
      }
    });
  } else {
    res.status(403).send(valid);
  }
});

router.post('/login', (req, res) => {
  const valid = validation.validateLogin(req.body);
  if (req.session && req.session.email !== null && req.session.email !== undefined) {
    res.redirect(301, '/');
  } else if (valid === null) {
    models.account.findOne({
      email: req.body.email,
    }, { password: 1, _id: 0 }, (err, account) => {
      if (account) {
        if (bcrypt.compare(req.body.password, account.password)) {
          req.session.email = req.body.email;
          res.redirect(301, '/');
        } else {
          res.status(400).send('Incorrect username or password.');
        }
      } else {
        res.status(400).send('Incorrect username or password.');
      }
    });
  } else {
    res.status(403).send(valid);
  }
});

module.exports = router;
