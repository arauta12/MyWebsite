const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({}, '-_id -__v');
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id)
            return res.status(400).json({ status: "failed", message: "Missing id" });

        const user = await User.findById(id, '-_id -__v');
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

const createUser = async (req, res) => {
    const { data = {} } = req.body;
    const { username, password, role = 'viewer' } = data;

    try {
        if (!username || !password)
            return res.status(400).json({ status: "failed", message: "Missing required fields" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, role });
        return res.status(201).json({ status: "success", data: { username, role } });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { data = {} } = req.body;

    try {
        await User.findByIdAndUpdate(id, data);
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { username, role } = await User.findByIdAndDelete(id);
        return res.status(200).json({ status: "success", data: { username, role } });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};