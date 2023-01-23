const express = require('express');
const router = express.Router();
const { isAuth, isOwn, isAdmin } = require('../middleware/authMiddleware');

const post_controller = require('../controllers/postController');

//router.use('/:id/comments', commentRouter);

router.get('/', post_controller.post_list);

router.post('/', isAuth, post_controller.post_create_post);

router.get('/create', isAuth, post_controller.post_create_get);

router.get('/:id', isAuth, isOwn, post_controller.post_detail);

router.put('/:id', isAuth, post_controller.post_update);

router.delete('/:id', isAuth, post_controller.post_delete);

module.exports = router;
