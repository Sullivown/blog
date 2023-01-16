const { body, validationResult } = require('express-validator');
const async = require('async');

const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.comment_list = function (req, res, next) {
	Comment.find({ post: req.params.postId }).exec(function (
		err,
		list_comments
	) {
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
			post: req.params.postId,
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

		Post.findById(req.params.postId).exec(function (err, post) {
			if (err) {
				return next(err);
			}

			comment.save((err) => {
				if (err) {
					return next(err);
				}
			});

			post.comments.push(comment);

			post.save((err) => {
				if (err) {
					return next(err);
				}
			});
		});

		res.json({ message: 'Comment created successfully', comment });
	},
];

module.exports.comment_update = [
	body('content')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Comment content cannot be blank')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const comment = new Comment({
			_id: req.params.id,
			post: req.params.postId,
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

		Comment.findByIdAndUpdate(
			req.params.id,
			comment,
			(err, updatedComment) => {
				if (err) {
					console.log(err);
					return next(err);
				}
				res.json({
					message: 'Comment updated successfully',
					comment: updatedComment,
				});
			}
		);
	},
];

module.exports.comment_delete = function (req, res, next) {
	async.parallel(
		{
			comment(callback) {
				Comment.findById(req.params.id).exec(callback);
			},
			post(callback) {
				Post.findById(req.params.postId).exec(callback);
			},
		},
		(err, results) => {
			if (err) {
				return next(err);
			}

			results.post.comments.filter(
				(comment) => comment != results.comment._id
			);
			results.post.save();

			Comment.findByIdAndDelete(req.params.id, (err) => {
				if (err) {
					return next(err);
				}
				res.json({ message: 'Comment deleted sucessfully' });
			});
		}
	);
};
