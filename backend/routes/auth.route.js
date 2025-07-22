const express = require('express');
const authControl = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authControl.login);
router.post('/signup', authControl.signup);
router.post('/logout', authControl.logout);

module.exports = router;
