const multer = require('multer');
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadFile = async (fileData) => {
    const { originalname, mimetype, size, filename } = fileData;
    const extension = path.extname(originalname);

    return await File.create({
        name: originalname,
        extension,
        mimeType: mimetype,
        size,
        uploadDate: new Date()
    });
};

exports.listFiles = async (listSize = 10, page = 1) => {
    const limit = parseInt(listSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const files = await File.findAndCountAll({ limit, offset });
    return { total: files.count, files: files.rows };
};

exports.getFileInfo = async (id) => {
    const file = await File.findByPk(id);

    if (!file) {
        throw new Error('File not found');
    }

    return file;
};

exports.downloadFile = async (id) => {
    const file = await File.findByPk(id);

    if (!file) {
        throw new Error('File not found');
    }

    return path.resolve(__dirname, '..', 'uploads', file.name);
};

exports.updateFile = async (id, fileData) => {
    const { originalname, mimetype, size } = fileData;
    const extension = path.extname(originalname);

    const file = await File.findByPk(id);

    if (!file) {
        throw new Error('File not found');
    }

    const oldFilePath = path.resolve(__dirname, '..', 'uploads', file.name);
    fs.unlinkSync(oldFilePath);

    file.name = originalname;
    file.extension = extension;
    file.mimeType = mimetype;
    file.size = size;
    await file.save();

    return file;
};

exports.deleteFile = async (id) => {
    const file = await File.findByPk(id);

    if (!file) {
        throw new Error('File not found');
    }

    const filePath = path.resolve(__dirname, '..', 'uploads', file.name);
    fs.unlinkSync(filePath);

    await file.destroy();
};
