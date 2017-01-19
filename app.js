

var express = require('express'),
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

var app = express();
module.exports = require('./config/express')(app, config);

var gracefulExit = function() {
  db.close(function () {
    process.exit(0);
  });
}
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


io.on('connection', function (socket) {
  socket.emit('news', 'welcome here new client !');
  setInterval(function(){
    socket.emit('news', 'ping');
  }, 1000);  
});
