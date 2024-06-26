const multer = require('multer');
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user.id;
        const userDir = path.join(__dirname, '..', 'uploads', userId);

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadFile = async (fileData, userId) => {
    const { originalname, mimetype, size } = fileData;
    const extension = path.extname(originalname);

    return await File.create({
        name: originalname,
        extension,
        mimeType: mimetype,
        size,
        uploadDate: new Date(),
        userId: userId
    });
};


exports.listFiles = async (userId, listSize = 10, page = 1) => {
    const limit = parseInt(listSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const files = await File.findAndCountAll({
        where: { userId: userId },
        limit,
        offset
    });
    return { total: files.count, files: files.rows };
};

exports.getFileInfo = async (id, userId) => {
    const file = await File.findOne({ where: { id, userId } });

    if (!file) {
        throw new Error('File not found');
    }

    return file;
};

exports.downloadFile = async (id, userId) => {
    const file = File.findOne({ where: { id, userId } });

    if (!file) {
        throw new Error('File not found');
    }

    return path.join(__dirname, '..', 'uploads', userId, file.name);
};

exports.updateFile = async (id, fileData, userId) => {
    const { originalname, mimetype, size } = fileData;
    const extension = path.extname(originalname);

    const file = await File.findOne({ where: { id, userId } });

    if (!file) {
        throw new Error('File not found');
    }

    const oldFilePath = path.join(__dirname, '..', 'uploads', userId, file.name);
    const newFilePath = path.join(__dirname, '..', 'uploads', userId, originalname);

    // Rename the file before updating the database entry
    fs.renameSync(oldFilePath, newFilePath);

    // Update the file metadata in the database
    file.name = originalname;
    file.extension = extension;
    file.mimeType = mimetype;
    file.size = size;
    await file.save();

    return file;
};

exports.deleteFile = async (id, userId) => {
    const file = await File.findOne({ where: { id, userId } });

    if (!file) {
        throw new Error('File not found');
    }

    const filePath = path.join(__dirname, '..', 'uploads', userId, file.name);
    fs.unlinkSync(filePath);

    await file.destroy();
};
