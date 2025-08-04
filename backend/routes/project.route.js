const express = require('express');
const projectControl = require('../controllers/project.controller');
const { verifyToken, verifyAdmin } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/public', projectControl.getDisplayProjects);

router.use(verifyToken);
router.get('/', projectControl.getAllProjects);
router.get('/:id', projectControl.getProject);

router.use(verifyAdmin);
router.delete('/:id', projectControl.deleteProject);
router.post('/', projectControl.createProject);
router.patch('/:id', projectControl.updateProject);

module.exports = router;
