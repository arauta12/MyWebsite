const express = require('express');
const messageControl = require('../controllers/message.controller');
const router = express.Router();

/*
    NOTE: All but GET must be authenticated with admin!
*/


router.post('/', messageControl.createMessage);
router.get('/', messageControl.getMessages);

module.exports = router;
