var uuid = require('node-uuid');
var models = require('../models');
var User = models.User;

var results = [];

module.exports = {
  create: function(req, res) {
    var data = {
      email: req.body.email,
      password: req.body.password
    };

    User.create({
      email: data.email,
      password: data.password
    }).then(function(user) {
      res.json(user);
    });
  },
  login: function(req, res) {
    var data = {
      email: req.body.email,
      password: req.body.password
    };

    User.find({
      where: data
    }).then(function(user) {
      if (user) {
        user.updateAttributes({
          sessionToken: uuid.v4()
        }).then(function(user) {
          res.json(user);
        });
      } else {
        res.status(400).send('User does not exist.')
      }
    });
  },
  logout: function(req, res) {
    // Do something when users logs out
    res.status(200).send();
  }
};
