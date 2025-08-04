const express = require('express');
const userControl = require('../controllers/user.controller');
const { verifyToken, verifyAdmin } = require('../controllers/auth.controller');
const User = require('../models/user.model');

const router = express.Router();

router.use(verifyToken);
router.use(verifyAdmin);
router.route('/')
    .get(userControl.getAllUsers)
    .post(userControl.createUser);

router.route('/:id')
    .get(userControl.getUser)
    .patch(userControl.updateUser)
    .delete(userControl.deleteUser);

module.exports = router;