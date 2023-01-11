const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	creation_date: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function () {
	return `/user/${this.id}`;
});

UserSchema.pre('save', (next) => {
	const user = this;
	const hash = bcrypt.hash(this.password, 10);

	this.password = hash;
	next();
});

UserSchema.methods.isValidPassword = (password) => {
	const user = this;
	const compare = bcrypt.compare(password, user.password);

	return compare;
};

module.exports = mongoose.model('User', UserSchema);
