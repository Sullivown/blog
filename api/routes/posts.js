const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

/* GET users listing. */
router.get('/', post_controller.post_list);

router.get('/create', post_controller.post_create_get);

router.get('/:id', post_controller.post_detail);

module.exports = router;
