function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var app = require('express')(),
  server = require('http').Server(app);
  io = require('socket.io')(server);
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

module.exports = require('./config/express')(app, config);

var gracefulExit = function() {
  db.close(function () {""
    process.exit(0);
  });
}
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

Vote = mongoose.model('Vote');

var allClients = [];

io.on('connection', function (socket) {
  socket.emit('news', 'welcome here new client !');
  allClients.push(socket);
  socket.on('disconnect', function(){
    allClients.splice(allClients.indexOf(socket), 1);
  });
});

var interval = setInterval(function(){
  var cutoff = new Date();
  cutoff.setMinutes(cutoff.getMinutes() - 10);
  var query = Vote.find({date : {$gt : cutoff}}).sort({ date: -1 })
  query.then(result => {
    var voteData = {
      nbBullshit: Math.max(result.filter(v => v.vote == 'bullshit').length + getRandomInt(-1,2),0),
      nbMeGusta: Math.max(result.filter(v => v.vote == 'meGusta').length + getRandomInt(-1,2),0)
    };
    allClients.forEach(socket => {
      socket.emit('data', voteData);
    });
  }, error => {
    console.error(error);
  });
}, 500);
