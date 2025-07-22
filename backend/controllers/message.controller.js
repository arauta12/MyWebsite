const Message = require('../models/message.model');

/**
 * Get all messages
 * 
 * Filter is passed in the body to select particular ones
 * @returns List of all message objects satisfying the conditions
 */
const getMessages = async (req, res) => {
    // const { filter = {} } = req.body;

    try {
        const messages = await Message.find({}, '-_id -__v');
        return res.status(200).json({ status: "success", data: messages });
    } catch (err) {
        console.error(chalk.red(`MESSAGE ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};


const createMessage = async (req, res) => {
    const { data = {} } = req.body;
    const { name, email, contents } = data;

    try {
        if (!name || !email || !contents)
            return res.status(400).json({ status: "failed", message: "Missing required fields!" });

        await Message.create({ name, email, contents });
        return res.status(201).json({ status: "success", data: name });
    } catch (err) {
        console.error(chalk.red(`MESSAGE ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

module.exports = {
    getMessages,
    createMessage
};
