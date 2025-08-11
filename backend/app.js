const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const projectRoute = require('./routes/project.route');
const messageRoute = require('./routes/message.route');
const uploadRoute = require('./routes/uploads.route');

const app = express();

const whitelist = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:80",
    `http://ec2-3-131-91-133.us-east-2.compute.amazonaws.com`
];

const corsConfig = {
    origin: whitelist,
    credentials: true,
    optionsSuccessStatus: 200
};

const createLogName = () => {
    const logDate = new Date(Date.now());
    const logName = `${logDate.getUTCMonth()}-${logDate.getUTCDay()}-${logDate.getUTCFullYear()}.log`;
    console.log(logName);

    return path.join(__dirname, 'logs', logName);
};

const logStream = fs.createWriteStream(
    createLogName(),
    { autoClose: true, emitClose: false, flags: 'a' }
);

const logger = morgan("combined", { immediate: true, stream: logStream });

app.use(logger);
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);
// app.use('/api/uploads', uploadRoute);

app.all('{*splat}', (req, res) => {
    res.status(404).send('That resource does not exist!');
});

module.exports = app;