const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
	'login',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		(email, password, done) => {
			return User.findOne({ email, password }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Incorrect username or password',
					});
				}
				if (User.isValidPassword(password)) {
					return done(null, user, {
						message: 'Logged in successfully',
					});
				}
			});
		}
	)
);
