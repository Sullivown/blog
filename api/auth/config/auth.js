const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

passport.use(
	'login',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		async (email, password, done) => {
			const user = await User.findOne({ email });

			if (!user) {
				return done(null, false, {
					message: 'Incorrect username or password',
				});
			}

			const isValidPass = await user.isValidPassword(password);

			if (!isValidPass) {
				return done(null, false, {
					message: 'Incorrect username or password',
				});
			}

			return done(null, user, {
				message: 'Logged in successfully',
			});
		}
	)
);
