const express = require('express');
const passport = require('passport');
const router = express.Router();

const index_controller = require('../controllers/indexController');

router.get('/', index_controller.index_get);

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
