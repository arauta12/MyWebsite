const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "viewer",
        enum: {
            values: [ 'admin', 'viewer' ],
            message: '{VALUE} is not a valid role!'
        }
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
