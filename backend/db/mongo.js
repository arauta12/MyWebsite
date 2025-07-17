const chalk = require('chalk');
const mongoose = require('mongoose');

const connect = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(chalk.green("Connected to MongoDB!")))
        .catch((err) => console.error(chalk.red(`DB CONNECTION ERROR: ${err.message}`)));
};

module.exports = { mongoose, connect };
