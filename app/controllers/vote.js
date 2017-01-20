var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Vote = mongoose.model('Vote');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/vote', (req, res) => {
  new Vote({
    user: req.body.user||'anonymous',
    vote: req.body.vote||'bullshit'
  }).save(function (err) {
    if (err) throw err;
    res.sendStatus(200)
  });
});
