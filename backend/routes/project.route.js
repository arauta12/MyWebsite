const express = require('express');
const projectControl = require('../controllers/project.controller');
const router = express.Router();

/*
    NOTE: All but GET must be authenticated with admin!
*/

router.route('/')
    .get(projectControl.getAllProjects)
    .post(projectControl.createProject);
router.route('/:id')
    .get(projectControl.getProject)
    .patch(projectControl.updateProject)
    .delete(projectControl.deleteProject);

module.exports = router;