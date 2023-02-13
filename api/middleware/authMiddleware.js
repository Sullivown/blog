const passport = require('passport');

const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.isAuth = passport.authenticate('jwt', { session: false });

module.exports.isOwn = function (req, res, next) {
	if (req.user.admin) {
		next();
	} else {
		if (req.resourceType == 'user') {
			if (req.params.id === req.user?.id) {
				next();
			} else {
				res.status(401).json({
					message:
						'You are not authorized to view or edit this resource',
				});
			}
		} else if (req.resourceType == 'post') {
			Post.findById(req.params.id)
				.populate('user')
				.exec((err, post) => {
					if (err) {
						return next(err);
					}
					console.log(post.user.id);

					if (post.user.id === req.user?.id) {
						next();
					} else {
						res.status(401).json({
							message:
								'You are not authorized to view or edit this resource',
						});
					}
				});
		} else if (req.resourceType == 'comment') {
			Comment.findById(req.params.id).exec((err, comment) => {
				if (err) {
					return next(err);
				}

				if (comment.user == req.user?.id) {
					next();
				} else {
					res.status(401).json({
						message:
							'You are not authorized to view or edit this resource! It is not yours!',
						commentUser: comment.user,
						requestUserId: req.user?.id,
					});
				}
			});
		} else {
			next();
		}
	}
};

module.exports.isAdmin = function (req, res, next) {
	if (req.user.admin) {
		next();
	} else {
		res.status(401).json({
			message: 'You are not authorized to view this resource',
		});
	}
};
