var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Vote = mongoose.model('Vote');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/vote', (req, res) => {
  new Vote({
    user: req.body.user,
    vote: req.body.vote
  }).save(function (err) {
    if (err) return handleError(err);
    res.sendStatus(200)
  });
});
