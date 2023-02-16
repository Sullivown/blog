const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: { type: Boolean, default: false },
	creation_date: { type: Date, default: Date.now },
});

UserSchema.virtual('full_name').get(function () {
	return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual('url').get(function () {
	return `/users/${this.id}`;
});

UserSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(this.password, 10);

	this.password = hash;
	next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
	const user = this;
	if (this._update.password) {
		const hash = await bcrypt.hash(this._update.password, 10);

		this._update.password = hash;
	}
	next();
});

UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
};

module.exports = mongoose.model('User', UserSchema);
