var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bullshit-o-meter'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/bullshit-o-meter-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bullshit-o-meter'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bullshit-o-meter-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bullshit-o-meter'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bullshit-o-meter-production'
  }
};

module.exports = config[env];
