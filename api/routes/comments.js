const express = require('express');
const router = express.Router({ mergeParams: true });
const { isAuth, isOwn } = require('../middleware/authMiddleware');

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list);

router.post('/', isAuth, commentController.comment_create);

router.put('/:id', isAuth, isOwn, commentController.comment_update);

router.delete('/:id', isAuth, isOwn, commentController.comment_delete);

router.get('/:id', isOwn, commentController.comment_detail);

module.exports = router;
