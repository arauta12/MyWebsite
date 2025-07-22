const express = require('express');
const authControl = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authControl.login);
router.post('/signup', authControl.signup);

module.exports = router;