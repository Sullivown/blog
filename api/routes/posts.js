const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../auth/authMiddleware');

const post_controller = require('../controllers/postController');

const commentRouter = require('../routes/comments');

//router.use('/:id/comments', commentRouter);

router.get('/', post_controller.post_list);

router.post('/', isAuth, post_controller.post_create_post);

router.get('/create', isAuth, post_controller.post_create_get);

router.get('/:id', post_controller.post_detail);

router.put('/:id', isAuth, post_controller.post_update);

router.delete('/:id', isAuth, post_controller.post_delete);

module.exports = router;
