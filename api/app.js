const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./auth/config/auth');
require('./auth/config/tokenAuth');

const getResourceType = require('./middleware/getResourceType');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const usersRouter = require('./routes/users');

const app = express();

// Set up mongoose connection
const mongoDB = process.env.DB_CONNECT;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => done(err, user));
});

//CORS settings
var corsOptions = {
	origin: 'https://sullivown.github.io/blog/',
	optionsSuccessStatus: 200,
};

app.use(passport.initialize());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(getResourceType);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/posts/:postId/comments', commentRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// only provide error in development
	res.status(400).json({
		message: 'An error has occured',
		error: req.app.get('env') === 'development' ? err : {},
	});
});

module.exports = app;
