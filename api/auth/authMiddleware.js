const passport = require('passport');

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

module.exports.isAuth = passport.authenticate('jwt', { session: false });

module.exports.isAdmin = function (req, res, next) {
	if (req.user.admin) {
		next();
	} else {
		res.status(401).json({
			message: 'You are not authorized to view this resource',
		});
	}
};
