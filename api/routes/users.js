const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	userController.user_list
);

router.post('/', userController.user_create);

router.put('/:id', userController.user_update);

router.put('/:id/updatepassword', userController.user_update_password);

router.delete('/:id', userController.user_delete);

router.get('/:id', userController.user_detail);

module.exports = router;
