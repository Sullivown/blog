const express = require('express');
const router = express.Router();
const passport = require('passport');

const post_controller = require('../controllers/postController');

/* GET users listing. */
router.get('/', post_controller.post_list);

router.get(
	'/create',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_create_get
);

router.post(
	'/create',
	passport.authenticate('jwt', { session: false }),
	post_controller.post_create_post
);

router.get('/:id', post_controller.post_detail);

module.exports = router;
