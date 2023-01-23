const express = require('express');
const router = express.Router();
const { isAuth, isOwn, isAdmin } = require('../middleware/authMiddleware');

const userController = require('../controllers/userController');

router.get('/', isAuth, isAdmin, userController.user_list);

router.post('/', userController.user_create);

router.put('/:id', isAuth, isOwn, userController.user_update);

router.put(
	'/:id/updatepassword',
	isAuth,
	isOwn,
	userController.user_update_password
);

router.delete('/:id', isAuth, isOwn, userController.user_delete);

router.get('/:id', userController.user_detail);

module.exports = router;
