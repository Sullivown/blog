const { body, validationResult } = require('express-validator');
const async = require('async');

const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.comment_list = function (req, res, next) {
	Comment.find({ post: req.params.id }).exec(function (err, list_comments) {
		if (err) {
			return next(err);
		}
		res.json({
			message: 'Request successful',
			comment_list: list_comments,
		});
	});
};

module.exports.comment_detail = function (req, res, next) {
	Comment.findById(req.params.id).exec(function (err, comment) {
		if (err) {
			return next(err);
		}
		res.json({ message: 'Comment request successful', comment });
	});
};

module.exports.comment_create = [
	body('content')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Comment content cannot be blank')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const comment = new Comment({
			post: req.body.postId,
			content: req.body.content,
			user: req.user._id,
		});

		if (!errors.isEmpty()) {
			res.json({
				message: 'Comment creation failed',
				comment,
				errors: errors.array(),
			});
			return;
		}

		comment.save((err) => {
			if (err) {
				return next(err);
			}
		});

		res.json({ message: 'Comment created successfully', post });
	},
];

module.exports.comment_update = [];

module.exports.comment_delete = [];
