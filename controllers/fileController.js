const catchAsync = require('../utils/catchAsync');
const fileService = require('../services/fileService');
const { AppError } = require('../middleware/errorMiddleware');

exports.uploadMiddleware = fileService.uploadMiddleware;

exports.uploadFile = catchAsync(async (req, res, next) => {
    const file = await fileService.uploadFile(req.file, req.user.id);
    res.json(file);
});

exports.listFiles = catchAsync(async (req, res, next) => {
    const { list_size, page } = req.query;
    const files = await fileService.listFiles(req.user.id, list_size, page);
    res.json(files);
});

exports.getFileInfo = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const file = await fileService.getFileInfo(id, req.user.id);
    res.json(file);
});

exports.downloadFile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const filePath = await fileService.downloadFile(id, req.user.id);
    res.download(filePath);
});

exports.updateFile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const file = await fileService.updateFile(id, req.file, req.user.id);
    res.json(file);
});

exports.deleteFile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await fileService.deleteFile(id, req.user.id);
    res.json({ message: 'File deleted successfully' });
});
