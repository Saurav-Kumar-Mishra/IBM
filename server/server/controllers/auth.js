const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "My Secret Key";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: "Invalid email or password" });
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
        return res.status(400).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    const sessionToken = new Token({ userId: user._id, key: token });
    await sessionToken.save();

    res.send({ user, token });
};

exports.logout = async (req, res) => {
    try {
        await Token.deleteOne({ key: req.token });
        res.send({ message: "Logout successful" });
    } catch (error) {
        res.status(500).send({ error: "Logout failed" });
    }
};