const express = require('express');
const passport = require('passport');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
	res.json({ message: 'Welcome to the API' });
});

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			message: 'You have accessed a restricted resource! Hooray!',
		});
	}
);

module.exports = router;
