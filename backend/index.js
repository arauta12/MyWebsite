const { config } = require('dotenv');
const process = require('process');
const app = require('./app');
const { mongoose, connect } = require('./db/mongo');

const chalk = require('chalk');

config();
const PORT = process.env.PORT | 3000;

const server = app.listen(PORT, (err) => {
    if (err)
        console.error(chalk.red(`${chalk.underline("SERVER ERROR!")}: ${err.message}`));

    const msg = chalk.green(`===========================================
= Setup complete!                         =                             
= Server now listening on port ${PORT}...    =
===========================================`);

    console.log(msg);
});

connect();

process.on('SIGTERM', () => {
    console.debug(chalk.yellow('\u26a0 SIGTERM signal! Closing server...'));

    server.close((err) => {
        if (err)
            console.error(chalk.red(`${chalk.underline("SERVER ERROR!")}: ${err.message}`));

        console.debug(chalk.yellow('\u26a0 Server is closed.'));
    });

    console.debug(chalk.yellow('\u26a0 Shutting DB connection...'));
    mongoose.connection.close();
    console.debug(chalk.yellow('\u26a0 Closed DB connection.'));

    process.exit(0);
});

