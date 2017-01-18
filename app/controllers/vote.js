var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Vote = mongoose.model('Vote');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/vote', (req, res) => {
  var cutoff = new Date();
  cutoff.setMinutes(cutoff.getMinutes() - 10);

  var query = Vote.find({date : {$gt : cutoff}}).sort({ date: -1 })
  query.then(result => {
    res.json({
      nbBullshit: result.filter(v => v.vote == 'bullshit').length,
      nbMeGusta: result.filter(v => v.vote == 'meGusta').length
    });
  }, error => {
    console.error(error);
  })
});

router.post('/vote', (req, res) => {
  new Vote({
    user: req.body.user,
    vote: req.body.vote
  }).save(function (err) {
    if (err) return handleError(err);
    res.sendStatus(200)
  });
});
