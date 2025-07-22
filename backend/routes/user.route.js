const express = require('express');
const userControl = require('../controllers/user.controller');
const User = require('../models/user.model');

const router = express.Router();

router.route('/')
    .get(userControl.getAllUsers)
    .post(userControl.createUser);

router.route('/:id')
    .get(userControl.getUser)
    .patch(userControl.updateUser)
    .delete(userControl.deleteUser);

module.exports = router;