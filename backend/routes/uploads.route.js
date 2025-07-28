const express = require('express');
const uuid = require('uuid').v6;

const { verifyToken, verifyAdmin } = require('../controllers/auth.controller');
const { uploadImageMulter, uploadFileMulter } = require('../multer/multerConfig');
const fileLoader = require('../multer/fileUpload');

const router = express.Router();

router.get('/pdfs/:name', fileLoader.downloadFile);
router.get('/images/:name', fileLoader.downloadImage);


router.use(verifyToken);
router.use(verifyAdmin);
router.post('/pdfs', uploadFileMulter.single('file'), fileLoader.uploadFile);
router.post('/images', uploadImageMulter.single('image'), fileLoader.uploadImage);

module.exports = router;
