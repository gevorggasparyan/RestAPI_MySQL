const authService = require('../services/authService');

exports.signup = async (req, res) => {
    const { id, password } = req.body;

    try {
        const tokens = await authService.signup(id, password);
        res.json(tokens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.signin = async (req, res) => {
    const { id, password } = req.body;

    try {
        const tokens = await authService.signin(id, password);
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const tokens = await authService.refreshToken(refreshToken);
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.info = (req, res) => {
    res.json({ id: req.user.id });
};

exports.logout = async (req, res) => {
    try {
        await authService.logout(req.user.id);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
