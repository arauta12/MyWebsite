const path = require('path');
const multer = require('multer');
const uuid = require('uuid').v6;

const uploadFolder = path.join(__dirname, '..', 'uploads');
const uploadImageFolder = path.join(uploadFolder, 'images');
const uploadFileFolder = path.join(uploadFolder, 'pdfs');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`destination: ${file}`);
        cb(null, uploadImageFolder);
    },
    filename: (req, file, cb) => {
        const { originalname, mimetype } = file;
        console.log(`CB: ${JSON.stringify(file)}`);

        if (!mimetype.includes("image")) {
            cb(new Error("File is not an image!"));
        } else {
            const uid = uuid();
            const name = originalname;
            req.locals = { uid, name };
            cb(null, `${uid}-${originalname}`);
        }

    }
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`destination: ${file}`);

        cb(null, uploadFileFolder);
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        console.log(`CB: ${JSON.stringify(file)}`);

        const uid = uuid();
        const name = originalname;
        req.locals = { uid, name };
        cb(null, `${uuid()}-${originalname}`);

    }
});

const uploadImageMulter = multer({
    storage: imageStorage,
    // limits: {
    //     fileSize: 1024 * 1024,
    //     files: 1,
    //     fields: 10
    // }
});

const uploadFileMulter = multer({
    storage: fileStorage,
    // limits: {
    //     fileSize: 1024 * 1024,
    //     files: 1,
    //     fields: 10
    // }
});

module.exports = {
    uploadImageMulter, uploadFileMulter,
    uploadImageFolder, uploadFileFolder
};
