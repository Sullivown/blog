const { body, validationResult } = require('express-validator');

const Post = require('../models/Post');

exports.post_list = function (req, res, next) {
	Post.find()
		.populate({ path: 'user', select: 'first_name last_name' })
		.populate([
			{
				path: 'comments',
				populate: [{ path: 'user', select: 'first_name last_name' }],
			},
		])
		.sort([['creation_date', 'ascending']])
		.exec(function (err, list_posts) {
			if (err) {
				return next(err);
			}
			res.json({ message: 'Request successful', post_list: list_posts });
		});
};

exports.post_detail = function (req, res, next) {
	Post.findById(req.params.id)
		.populate({ path: 'user', select: 'first_name last_name' })
		.populate([
			{
				path: 'comments',
				populate: [{ path: 'user', select: 'first_name last_name' }],
			},
		])
		.exec(function (err, post) {
			if (err) {
				return next(err);
			}
			if (!post) {
				res.status(404).json({
					message: 'Post not found',
				});
			} else {
				res.json({
					message: 'Request successful',
					post,
				});
			}
		});
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
		.isIn(Post.schema.path('status').enumValues)
		.withMessage('You must enter a valid status')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const post = new Post({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			user: req.user.id,
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

		res.json({ message: 'Post created successfully', post });
	},
];

exports.post_update = [
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
		.isIn(Post.schema.path('status').enumValues)
		.withMessage('You must enter a valid status')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const post = new Post({
			_id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			comments: req.body.comments,
			user: req.user.id,
		});

		if (!errors.isEmpty()) {
			res.json({
				message: 'Post update failed',
				post,
				errors: errors.array(),
			});
			return;
		}

		Post.findByIdAndUpdate(req.params.id, post, (err, originalPostData) => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'Post updated successfully', post });
		});
	},
];

exports.post_delete = function (req, res, next) {
	Post.findByIdAndDelete(req.params.id, function (err, post) {
		if (err) {
			return next(err);
		}
		res.json({ message: 'Post deleted successfully' });
	});
};
