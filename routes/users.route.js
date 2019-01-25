const express = require('express');
const router = express.Router();

const users_controller = require('controllers/users.controller');

router.post('/signup', users_controller.signup);
router.post('/login', users_controller.login);

module.exports = router;