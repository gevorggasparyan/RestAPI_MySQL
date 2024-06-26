const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateTokens, verifyRefreshToken } = require('../utils/tokenUtils');

exports.signup = async (id, password) => {
    const existingUser = await User.findOne({ where: { id } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ id, password: hashedPassword });

    const tokens = generateTokens({ id: user.id });
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return tokens;
};

exports.signin = async (id, password) => {
    const user = await User.findOne({ where: { id } });

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
    }

    const tokens = generateTokens({ id: user.id });
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return tokens;
};

exports.refreshToken = async (refreshToken) => {
    const payload = verifyRefreshToken(refreshToken);

    const user = await User.findOne({ where: { id: payload.id, refreshToken } });

    if (!user) {
        throw new Error('Invalid refresh token');
    }

    const tokens = generateTokens({ id: user.id });
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return tokens;
};

exports.logout = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.refreshToken = null;
    await user.save();
};
