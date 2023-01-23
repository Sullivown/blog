const express = require('express');
const router = express.Router({ mergeParams: true });
const { isAuth } = require('../middleware/authMiddleware');

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list);

router.post('/', isAuth, commentController.comment_create);

router.put('/:id', isAuth, commentController.comment_update);

router.delete('/:id', isAuth, commentController.comment_delete);

router.get('/:id', commentController.comment_detail);

module.exports = router;
