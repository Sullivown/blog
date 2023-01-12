const express = require('express');
const passport = require('passport');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
	res.json({ message: 'Welcome to the API' });
});

router.post('/signup', [
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
		});

		res.json({ message: 'User created successfully' });
	},
]);

router.post('/login', function (req, res, next) {
	passport.authenticate('login', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user,
				err,
				info,
			});
		}

		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}

			const body = {
				_id: user.id,
				email: user.email,
			};

			const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
			return res.json({ token });
		});
	})(req, res, next);
});

module.exports = router;
