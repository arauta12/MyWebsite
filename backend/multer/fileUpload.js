const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const { uploadFileFolder, uploadImageFolder } = require('./multerConfig');

const saveImage = (req, res, next) => {
    if (!req.file) {
        next('route');
    } else {
        console.log(req.file);
        next();
    }
};


// TODO: update image attr in project to uid & name
const uploadImage = (req, res) => {
    if (!req.locals)
        return res.status(400).json({ status: "failed", message: "Missing fields!" });

    const { uid = "", name = "" } = req.locals;
    delete req.locals;

    if (!uid || !name)
        return res.status(400).json({ status: "failed", message: "Missing fields!" });

    if (!fs.existsSync(path.join(uploadImageFolder, `${uid}-${name}`)))
        return res.status(400).json({ status: "failed", message: "File failed to tupload!" });

    console.log(`${req.file} w/ uid: ${uid}`);

    res.status(201).json({ status: "success", data: { uid, name } });
};

const downloadImage = async (req, res) => {
    const { name } = req.params;

    const fileData = await fsPromise.readFile(path.join(uploadImageFolder, name));
    const dataArray = new Uint8Array(fileData);

    const blob = new Blob([ dataArray ], { type: `image/${name.split(".")[ 1 ]}` });
    const imageUrl = URL.createObjectURL(blob);

    console.log(imageUrl);
    console.log(blob);

    return res.status(200).json({ status: "success", data: imageUrl });
};

const downloadFile = async (req, res) => {
    const { name } = req.params;

    const fileData = await fsPromise.readFile(path.join(uploadFileFolder, name));
    // console.log(fileData);

    console.log(typeof fileData);

    return res.status(200).json({ status: "success", data: fileData });
};

const uploadFile = (req, res) => {

};

module.exports = {
    saveImage,
    uploadImage,
    downloadImage,
    downloadFile,
    uploadFile
};