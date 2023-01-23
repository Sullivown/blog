const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middleware/authMiddleware');

const userController = require('../controllers/userController');

router.get('/', isAuth, isAdmin, userController.user_list);

router.post('/', userController.user_create);

router.put('/:id', isAuth, userController.user_update);

router.put('/:id/updatepassword', isAuth, userController.user_update_password);

router.delete('/:id', isAuth, userController.user_delete);

router.get('/:id', userController.user_detail);

module.exports = router;
