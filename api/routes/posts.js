const express = require('express');
const router = express.Router();
const passport = require('passport');

const post_controller = require('../controllers/postController');

const commentRouter = require('../routes/comments');

//router.use('/:id/comments', commentRouter);

router.get('/', post_controller.post_list);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_create_post
);

router.get(
	'/create',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_create_get
);

router.get('/:id', post_controller.post_detail);

router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_update
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_delete
);

module.exports = router;
