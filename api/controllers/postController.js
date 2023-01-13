const passport = require('passport');
const { body, validationResult } = require('express-validator');
const async = require('async');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.post_list = function (req, res, next) {
	Post.find()
		.populate({ path: 'user', select: 'first_name last_name' })
		.sort([['creation_date', 'ascending']])
		.exec(function (err, list_posts) {
			if (err) {
				return next(err);
			}
			res.json({ message: 'Request successful', post_list: list_posts });
		});
};

exports.post_detail = function (req, res, next) {
	async.parallel(
		{
			post(callback) {
				Post.findById(req.params.id).populate('user').exec(callback);
			},
			comments(callback) {
				Comment.find({ post: req.params.id })
					.populate('user')
					.exec(callback);
			},
		},
		(err, results) => {
			if (err) {
				return next(err);
			}

			if (!results.post) {
				res.status(404).json({
					message: 'Post not found',
				});
			} else {
				res.json({
					message: 'Request successfull',
					post: results.post,
					comments: results.comments,
				});
			}
		}
	);
};

exports.post_create_get = function (req, res, next) {
	const statusValues = Post.schema.path('status').enumValues;
	res.json({ message: 'Request successful', statusValues });
};

exports.post_create_post = [
	body('title')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a title')
		.escape(),
	body('content')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Post content cannot be blank')
		.escape(),
	body('status')
		.trim()
		.isLength({ min: 1 })
		.equals('Draft' || 'Published')
		.withMessage('You must enter a valid status')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const post = new Post({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			user: req.user._id,
		});

		if (!errors.isEmpty()) {
			res.json({
				message: 'Post creation failed',
				post,
				errors: errors.array(),
			});
			return;
		}

		post.save((err) => {
			if (err) {
				return next(err);
			}
		});

		res.json({ message: 'post created successfully', post });
	},
];
