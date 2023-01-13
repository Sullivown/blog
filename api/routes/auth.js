const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController');

router.post('/signup', auth_controller.auth_signup_post);

router.post('/login', auth_controller.auth_login_post);

module.exports = router;
