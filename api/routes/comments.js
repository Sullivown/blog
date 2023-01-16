const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	commentController.comment_create
);

router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	commentController.comment_update
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	commentController.comment_delete
);

router.get('/:id', commentController.comment_detail);

module.exports = router;
