const Project = require('../models/project.model');
const chalk = require('chalk');

/**
 * Get projects for public display
 * 
 * @returns List of all public project objects
 */
const getDisplayProjects = async (req, res) => {
    try {
        const projects = await Project.find({ show: true }, '-_id -__v');
        return res.status(200).json({ status: "success", data: projects });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

/**
 * Get every project that exists
 * 
 * @returns List of all project objects
 */
const getAllProjects = async (req, res) => {
    // const { filter = "" } = req.body;

    try {
        const projects = await Project.find({});
        return res.status(200).json({ status: "success", data: projects });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

/**
 * Gets project with given URL parameter id
 * @returns All project data
 */
const getProject = async (req, res) => {
    if (!req.params?.id)
        return res.status(400).json({ status: "failed", message: "Missing id!" });

    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project)
            return res.status(400).json({ status: "failed", message: "No such project!" });

        return res.status(200).json({ status: "success", data: project });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

/**
 * Creates a new project with details from data object in request body 
 * @returns New project's name and show in a data object
 */
const createProject = async (req, res) => {
    if (!req.body?.data)
        return res.status(400).json({ status: "failed", message: "Missing required fields!" });

    const { data } = req.body;

    try {
        if (!data?.name || !data.description || !data.link)
            return res.status(400).json({ status: "failed", message: "Missing required fields!" });

        const { name, image, description, link, show } = data;

        const newProject = await Project.create({ name, image, description, link, show });
        return res.status(201).json({ status: "success", data: { name, show, id: newProject._id } });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

/**
 * Deletes project with given URL parameter id
 * @returns Deleted project's name and show in a data object
 */
const deleteProject = async (req, res) => {
    if (!req.params?.id)
        return res.status(400).json({ status: "failed", message: "Missing id!" });

    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject)
            return res.status(400).json({ status: "failed", message: "No such project!" });

        return res.status(200).json({ status: "success", data: { name: deletedProject.name, show: deletedProject.show } });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

/**
 * Updates project data of the one with URL parameter id
 * 
 * New data are provided in a data object in the request body
 * @returns Updated project's name and show in a data object
 */
const updateProject = async (req, res) => {
    if (!req.params?.id)
        return res.status(400).json({ status: "failed", message: "Missing id!" });

    const { id } = req.params;
    const { data } = req.body ?? { data: {} };

    const prohibitedFields = [ "_id", "__v", "createdAt", "updatedAt" ];

    prohibitedFields.forEach(key => {
        if (data && key in data)
            delete data[ key ];
    });

    try {
        const project = await Project.findByIdAndUpdate(id, data, { new: true });
        if (!project)
            return res.status(400).json({ status: "failed", message: "No such project!" });

        return res.status(200).json({ status: "success", data: { name: project.name, show: project.show } });
    } catch (err) {
        console.error(chalk.red(`PROJECT ROUTE ERROR: ${err.message}!`));
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again." });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject,
    getDisplayProjects
};
