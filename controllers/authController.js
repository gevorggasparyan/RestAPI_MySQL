const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');
const { AppError } = require('../middleware/errorMiddleware');

exports.signup = catchAsync(async (req, res, next) => {
    const { id, password } = req.body;
    const tokens = await authService.signup(id, password);
    res.json(tokens);
});

exports.signin = catchAsync(async (req, res, next) => {
    const { id, password } = req.body;
    const tokens = await authService.signin(id, password);
    res.json(tokens);
});

exports.refreshToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
});

exports.info = (req, res) => {
    res.json({ id: req.user.id });
};

exports.logout = catchAsync(async (req, res, next) => {
    await authService.logout(req.user.id);
    res.json({ message: 'Logged out successfully' });
});
