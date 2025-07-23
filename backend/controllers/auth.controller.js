const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const verifyToken = async (req, res, next) => {
    const jwtToken = req.cookies.jwt_token;

    if (!jwtToken)
        return res.status(401).json({ status: "failed", message: "Unauthorized!" });

    try {
        const { exp, username, role } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const existingUser = await User.findOne({ username, role });

        if (!existingUser || !existingUser.loggedIn)
            return res.status(401).json({ status: "failed", message: "Unauthorized!" });

        req.locals = role;
        next();
    } catch (err) {
        console.error(chalk.red(`ERROR Verify token: ${err.message}`));
        return res.status(500).json({ status: "failed", message: "Something went wrong! Try again." });
    }
};

const verifyAdmin = async (req, res, next) => {
    if (!req.locals || req.locals !== "Admin")
        return res.status(403).json({ status: "failed", message: "Unauthorized!" });

    delete req.locals;
    next();
};

const signup = async (req, res) => {
    const { data: { username, password, role = 'viewer' } } = req.body;

    try {
        if (!username || !password)
            return res.status(400).json({ status: "failed", message: "Missing username or password!" });

        const existingUser = await User.findOne({ username }, '-_id -__v');
        if (existingUser)
            return res.status(400).json({ status: "failed", message: "User already exists!" });

        const hashedPassword = bcrypt.hash(password, 10);
        const newUser = await User.create({ username, hashedPassword, role, loggedIn: true });

        // verification stuff & jwt
        const token = await jwt.sign({ username, role }, process.env.JWT_SECRET, {
            expiresIn: '10h'
        });

        return res.status(201).json({ status: "success", data: { username, role } }).cookie("jwt_token", token);
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

const login = async (req, res) => {
    const { data = {} } = req.body;
    const { username = "", password = "" } = data;

    try {
        const jwtToken = req.cookies.jwt_token;

        if (jwtToken) {
            const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET);

            const { exp, username, role } = jwtData;
            const existingUser = await User.findOne({ username, role });

            if (existingUser && existingUser.loggedIn) {
                const expired = (exp <= (Math.ceil(Date.now() / 1000)));
                if (!expired) {
                    return res.status(200).json({ status: "success", data: { username: jwtData.username, role: jwtData.role } });
                }
            }
        }

        if (!data || !username || !password)
            return res.status(400).json({ status: "failed", message: "Missing username or password!" });

        const user = await User.findOne({ username });
        const passwordCompare = await bcrypt.compare(password, user?.password || "");

        if (!user || !passwordCompare)
            return res.status(401).json({ status: "failed", message: "Invalid credentials!" });

        const token = await jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '10h',
        });

        user.loggedIn = true;
        await user.save();

        res.clearCookie("jwt_token");
        res.cookie("jwt_token", token, {
            maxAge: 1000 * 60 * 60 * 10, // 10hrs
            secure: true,
            httpOnly: true,
        });

        return res.status(200).json({ status: "success", data: { username, role: user.role } });
    } catch (err) {
        console.error(chalk.red(`ERROR Login: ${err.message}`));
        return res.status(500).json({ status: "failed", message: "Something went wrong! Try again." });
    }
};

const logout = async (req, res) => {
    try {
        const jwtString = req.cookies.jwt_token;
        const jwtData = jwt.verify(jwtString, process.env.JWT_SECRET);

        if (!jwtData.username || !jwtData.role)
            return res.status(401).json({ status: "failed", message: "Invalid credentials." });

        const user = await User.findOne({ username: jwtData.username, role: jwtData.role });
        if (!user)
            return res.status(401).json({ status: "failed", message: "Invalid credentials." });

        user.loggedIn = false;
        res.clearCookie("jwt_token");
        return res.status(200).json({ status: "success", data: user.username });
    } catch (err) {
        console.error(chalk.red(`ERROR Logout: ${err.message}`));
        return res.status(500).json({ status: "failed", message: "Something went wrong! Try again." });
    }
};

module.exports = {
    signup,
    login,
    logout,
    verifyToken,
    verifyAdmin,
};