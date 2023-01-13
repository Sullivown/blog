const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	content: { type: String },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	creation_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
