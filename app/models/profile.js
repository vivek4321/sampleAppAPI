var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfileSchema   = new Schema({
	name: String,
	age: String,
	height: String,
	education: String,
	gender: String,
	mtongue: String,
	bodytype: String,
	languages: String,
	complexion: String,
	mstatus: String,
	pstatus: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
