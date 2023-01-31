const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.auth_login_post = function (req, res, next) {
	passport.authenticate('login', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Authentication error',
				err,
			});
		}

		req.login(user, { session: false }, (err) => {
			if (err) {
				res.status(400).json({ message: 'Login Error', err });
			}

			const body = {
				first_name: user.first_name,
				last_name: user.last_name,
			};

			const token = jwt.sign(
				{ sub: user.id, user: body },
				process.env.SECRET_KEY,
				{ expiresIn: '7d' }
			);
			return res.json({ message: 'Login successful', user: body, token });
		});
	})(req, res, next);
};
