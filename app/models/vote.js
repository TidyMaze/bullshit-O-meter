var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var voteSchema = new Schema({
  user: {type: String, default: 'anymous'},
  vote: String,
  date: {type: Date, default: Date.now},
});

mongoose.model('Vote', voteSchema);
