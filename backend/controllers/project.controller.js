const Project = require('../models/project.model');

/**
 * Get every project that exists
 * 
 * Filter is passed in the body to select particular ones
 * @returns List of all project objects satisfying the conditions
 */
const getAllProjects = async (req, res) => {
    // const { filter = "" } = req.body;

    try {
        const projects = await Project.find({}, '-_id -__v');
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

/**
 * Gets project with given URL parameter id
 * @returns All project data
 */
const getProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

/**
 * Creates a new project with details from data object in request body 
 * @returns New project's name and show in a data object
 */
const createProject = async (req, res) => {
    const { data = {} } = req.body;
    const { name, image, description, link, show } = data;

    try {
        if (!name || !description || !link)
            return res.status(400).json({ status: "failed", message: "Missing required fields!" });

        await Project.create({ name, image, description, link, show });
        return res.status(201).json({ status: "success", data: { name, show } });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

/**
 * Deletes project with given URL parameter id
 * @returns Deleted project's name and show in a data object
 */
const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, show } = await Project.findByIdAndDelete(id);
        return res.status(200).json({ status: "success", data: { name, show } });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

/**
 * Updates project data of the one with URL parameter id
 * 
 * New data are provided in a data object in the request body
 * @returns Updated project's name and show in a data object
 */
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const project = await Project.findByIdAndUpdate(id, data);
        console.log(data);

        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
};
