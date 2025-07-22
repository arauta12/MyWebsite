const Project = require('../models/project.model.js');
const projectControl = require('../controllers/project.controller.js');

const excludeOutFields = (arr, fields) => {
    const newArr = arr.map(item => {
        return Object.fromEntries(
            Object.entries(item).filter(key => {
                return !(fields.includes(key));
            })
        );
    });

    return newArr;
};

describe('Project Controllers', () => {

    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };

    test('should get all projects', async () => {
        const rawData = require('./mockProjects.js');
        const mockReq = {};
        const projects = await projectControl.getAllProjects(mockReq, mockRes);

        expect(projects).toStrictEqual(rawData);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(rawData);
    });

});
