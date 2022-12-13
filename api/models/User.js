const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	creation_date: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function () {
	return `/user/${this.id}`;
});

module.exports = mongoose.model('User', UserSchema);
