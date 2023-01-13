const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String },
	status: {
		type: String,
		required: true,
		enum: ['Published', 'Draft'],
		default: 'Draft',
	},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	creation_date: { type: Date, default: Date.now },
});

PostSchema.virtual('url').get(function () {
	return `/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
