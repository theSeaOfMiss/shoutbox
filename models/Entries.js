var mongoose = require('mongoose');
var User = require('./Users');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/shoutbox_app');

var schema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Entry', schema);

