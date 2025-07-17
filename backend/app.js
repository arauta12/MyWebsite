const express = require('express');
const helmet = require('helmet');

const projectRoute = require('./routes/project.route');
const messageRoute = require('./routes/message.route');

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/api/projects', projectRoute);
app.use('/api/messages', messageRoute);

app.all('{*splat}', (req, res) => {
    res.status(404).send('That resource does not exist!');
});

module.exports = app;