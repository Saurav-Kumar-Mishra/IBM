const User = require("../models/user");
const Token = require("../models/token");

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        const foundToken = await Token.findOne({ key: token });

        if (foundToken) {
            await foundToken.refresh();
            req.user = await User.findById(foundToken.userId);
        }

    }

    return next();
}