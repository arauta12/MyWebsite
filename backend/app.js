const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const messageRoute = require('./routes/message.route');

const app = express();

const corsConfig = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/messages', messageRoute);

app.all('{*splat}', (req, res) => {
    res.status(404).send('That resource does not exist!');
});

module.exports = app;