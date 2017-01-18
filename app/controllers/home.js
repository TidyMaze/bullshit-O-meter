var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Vote = mongoose.model('Vote');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Bullshit-O-meter',
  });
});
