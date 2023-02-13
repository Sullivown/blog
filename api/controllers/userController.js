const { body, validationResult } = require('express-validator');
const async = require('async');

const User = require('../models/User');
const Post = require('../models/Post');

module.exports.user_list = function (req, res, next) {
	User.find().exec(function (err, list_users) {
		if (err) {
			return next(err);
		}
		res.json({
			message: 'User list request successful',
			user_list: list_users,
		});
	});
};

module.exports.user_detail = function (req, res, next) {
	async.parallel(
		{
			user(callback) {
				User.findById(req.params.id).exec(callback);
			},
			user_posts(callback) {
				Post.find({ user: req.params.id })
					.where({ status: 'Published' })
					.populate({
						path: 'user',
						select: 'first_name last_name',
					})
					.sort([['creation_date', 'descending']])
					.exec(callback);
			},
		},
		(err, results) => {
			if (err) {
				return next(err);
			}

			res.json({
				message: 'User detail request successful',
				user: {
					first_name: results.user.first_name,
					last_name: results.user.last_name,
					email: results.user.email,
					admin: results.user.admin,
					creation_date: results.user.creation_date,
				},
				user_posts: results.user_posts,
			});
		}
	);
};

module.exports.user_create = [
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a first name')
		.escape(),
	body('last_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a last name')
		.escape(),
	body('email')
		.trim()
		.isLength({ min: 1 })
		.isEmail()
		.withMessage('You must enter a valid email address')
		.escape(),
	body('password')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a password')
		.escape(),
	body('password_confirm')
		.trim()
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);

		const user = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		});

		if (!errors.isEmpty()) {
			res.json({
				message: 'User creation failed',
				user,
				errors: errors.array(),
			});
			return;
		}

		user.save((err) => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'User created successfully' });
		});
	},
];

module.exports.user_update = [
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a first name')
		.escape(),
	body('last_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a last name')
		.escape(),
	body('email')
		.trim()
		.isLength({ min: 1 })
		.isEmail()
		.withMessage('You must enter a valid email address')
		.escape(),
	body('admin')
		.isBoolean()
		.withMessage('You must enter an admin value')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		const user = new User({
			_id: req.params.id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			admin: req.body.admin,
		});

		if (!errors.isEmpty()) {
			res.json({
				message: 'User update failed',
				user,
				errors: errors.array(),
			});
			return;
		}

		User.findByIdAndUpdate(req.params.id, user, (err, originalUserData) => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'User updated successfully', user });
		});
	},
];

module.exports.user_update_password = [
	body('password')
		.trim()
		.isLength({ min: 1 })
		.withMessage('You must enter a password')
		.escape(),
	body('password_confirm')
		.trim()
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match')
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.json({
				message: 'User password update failed',
				errors: errors.array(),
			});
			return;
		}

		User.findById(req.params.id, (err, user) => {
			if (err) {
				return next(err);
			}
			user.password = req.body.password;
			user.save();
			res.json({ message: 'User password updated successfully' });
		});
	},
];

module.exports.user_delete = function (req, res, next) {
	User.findByIdAndDelete(req.params.id, function (err, user) {
		if (err) {
			return next(err);
		}
		res.json({ message: 'User deleted successfully' });
	});
};
