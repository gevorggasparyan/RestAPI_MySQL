const fileService = require('../services/fileService');

exports.uploadMiddleware = fileService.uploadMiddleware;

exports.uploadFile = async (req, res) => {
    try {
        const file = await fileService.uploadFile(req.file);
        res.json(file);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listFiles = async (req, res) => {
    const { list_size, page } = req.query;

    try {
        const files = await fileService.listFiles(list_size, page);
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFileInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await fileService.getFileInfo(id);
        res.json(file);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.downloadFile = async (req, res) => {
    const { id } = req.params;

    try {
        const filePath = await fileService.downloadFile(id);
        res.download(filePath);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateFile = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await fileService.updateFile(id, req.file);
        res.json(file);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteFile = async (req, res) => {
    const { id } = req.params;

    try {
        await fileService.deleteFile(id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
