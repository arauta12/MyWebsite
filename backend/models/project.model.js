const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Unnamed"
    },
    image: {
        type: [ String ],
        default: []
    },
    description: {
        type: [ String ],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
