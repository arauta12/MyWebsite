const Project = require('../models/project.model.js');
const projectControl = require('../controllers/project.controller.js');
const mockProjects = require('./mockProjects.js');
const chalk = require('chalk');

jest.mock('../models/project.model.js');

// TODO test coverage for display projects
describe('Get public projects', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should retrieve public projects and hide internal details', async () => {
        const req = {};
        const expectedProjects = mockProjects.map(project => {
            const { _id, __v, ...filteredProject } = project;
            if (project.show)
                return filteredProject;
        });

        Project.find.mockImplementation(async ({ show }, hideAttributes) => {
            const hiddenAttributes = hideAttributes.split(" ").map(key => key.substring(1));

            const displayProjects = mockProjects.map(project => {
                const modifiedProject = { ...project };

                hiddenAttributes.forEach(key => {
                    if (key in modifiedProject)
                        delete modifiedProject[ key ];
                });
                if (show == modifiedProject.show)
                    return modifiedProject;
            });

            return displayProjects;
        });

        const resp = await projectControl.getDisplayProjects(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: expectedProjects });
    });

    test('should catch error', async () => {
        const req = {};
        Project.find.mockRejectedValue(new Error("something")).mockName('projectFind');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.getDisplayProjects(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: something!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });
});

describe('Get all projects', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should succeed', async () => {
        const req = {};
        Project.find.mockResolvedValue(mockProjects).mockName('projectFind');

        const resp = await projectControl.getAllProjects(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: mockProjects });
    });

    test('should throw error', async () => {
        const req = {};
        Project.find.mockRejectedValue(new Error("something")).mockName('projectFind');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.getAllProjects(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: something!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });

});

describe('Get a project', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return valid project', async () => {
        const id = "3828272C06418043D9B5DEF2";
        const req = { params: { id } };
        const expectedProject = mockProjects.find(item => item._id == id);
        Project.findById.mockResolvedValue(expectedProject);

        const resp = await projectControl.getProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: expectedProject });
    });

    test('should not find a project', async () => {
        const id = "10101";
        const req = { params: { id } };
        Project.findById.mockResolvedValue(null);

        const resp = await projectControl.getProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "No such project!" });
    });

    test('should have no params', async () => {
        const req = {};
        Project.findById.mockResolvedValue(null);

        const resp = await projectControl.getProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing id!" });
    });

    test('should check if id is undefined', async () => {
        const req = { params: {} };

        const resp = await projectControl.getProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing id!" });
    });

    test('should be an ID cast error', async () => {
        const req = { params: { id: "stuff" } };

        Project.findById.mockRejectedValue(new Error("unable to cast id")).mockName('projectFindById');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.getProject(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: unable to cast id!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });
});

describe('Create a project', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully create project', async () => {
        const newProjectData = { name: "name1", image: "img.png", description: [ "1", "2" ], link: "http://localhost", show: false };
        const req = {
            body: {
                data: newProjectData
            }
        };
        const createdProject = { ...newProjectData, "_id": "6D7B8758EA8E0534304C5BD0", "__v": 0 };
        Project.create.mockResolvedValue(createdProject);

        const resp = await projectControl.createProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(201);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: createdProject.name, show: createdProject.show, id: createdProject._id } });
    });

    test('should be required missing fields', async () => {
        const newProjectData = { image: "img.png", description: [ "1", "2" ], link: "http://localhost", show: false };
        const req = {
            body: {
                data: newProjectData
            }
        };

        Project.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await projectControl.createProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });

    test('should have no req body', async () => {
        const req = {};

        Project.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await projectControl.createProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });

    test('should handle error', async () => {
        const newProjectData = { name: "name", image: "img.png", description: [ "1", "2" ], link: "http://localhost", show: false };
        const req = {
            body: {
                data: newProjectData
            }
        };

        Project.create.mockRejectedValue(new Error("Network error"));
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.createProject(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: Network error!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });

});

describe('Delete a project', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return deleted project', async () => {
        const id = "1F2ECE8189710476FB8021DF";
        const req = { params: { id } };
        const expectedProject = mockProjects.find(item => item._id == id);
        Project.findByIdAndDelete.mockResolvedValue(expectedProject);

        const resp = await projectControl.deleteProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: expectedProject.name, show: expectedProject.show } });
    });

    test('should not find a project to delete', async () => {
        const id = "10101";
        const req = { params: { id } };
        Project.findByIdAndDelete.mockResolvedValue(null);

        const resp = await projectControl.deleteProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "No such project!" });
    });

    test('should check if id is undefined', async () => {
        const req = { params: {} };
        Project.findByIdAndDelete.mockResolvedValue(null);

        const resp = await projectControl.deleteProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing id!" });
    });

    test('should be an ID cast error', async () => {
        const req = { params: { id: "stuff" } };

        Project.findByIdAndDelete.mockRejectedValue(new Error("unable to cast id")).mockName('projectFindByIdAndDelete');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.deleteProject(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: unable to cast id!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });
});

describe('Update a project', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully update project', async () => {
        const req = { params: { id: "6974576B526AC6FB45272692" }, body: { data: { link: "https://www.google.com", image: "noimage.jpg", show: true } } };

        const editedProject = { ...mockProjects.find(item => item._id == req.params.id), ...req.body.data };
        Project.findByIdAndUpdate.mockResolvedValue(editedProject);

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: editedProject.name, show: editedProject.show } });
    });

    test('should be missing id', async () => {
        const req = { params: {}, body: { data: { link: "https://www.google.com", image: "noimage.jpg", show: true } } };

        Project.findByIdAndUpdate.mockResolvedValue(null);

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing id!" });
    });

    test('should keep project when no data', async () => {
        // data object not present at all
        const req = { params: { id: "6974576B526AC6FB45272692" }, body: {} };
        let mockProjectsCopy = mockProjects;
        let newProject;

        const expectedNewProject = mockProjects.find(item => item._id == req.params.id);
        Project.findByIdAndUpdate.mockImplementation(async (id, data, options) => {
            const i = mockProjectsCopy.findIndex(item => item._id == id);
            newProject = { ...mockProjectsCopy[ i ], ...data };
            mockProjectsCopy[ i ] = newProject;

            return (options.new) ? newProject : originalProject;
        });

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: expectedNewProject.name, show: expectedNewProject.show } });

        expect(newProject).toStrictEqual(expectedNewProject);
    });

    test('should keep project no body', async () => {
        // data object not present at all
        const req = { params: { id: "6974576B526AC6FB45272692" } };
        let mockProjectsCopy = mockProjects;
        let newProject;

        const expectedNewProject = mockProjects.find(item => item._id == req.params.id);
        Project.findByIdAndUpdate.mockImplementation(async (id, data, options) => {
            const i = mockProjectsCopy.findIndex(item => item._id == id);
            newProject = { ...mockProjectsCopy[ i ], ...data };
            mockProjectsCopy[ i ] = newProject;

            return (options.new) ? newProject : originalProject;
        });

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: expectedNewProject.name, show: expectedNewProject.show } });

        expect(newProject).toStrictEqual(expectedNewProject);
    });

    test('should be unable to find project', async () => {
        const req = { params: { id: "6974" }, body: { data: { link: "https://www.google.com", image: "noimage.jpg", show: true } } };
        Project.findByIdAndUpdate.mockResolvedValue(null);

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "No such project!" });
    });

    test('should be unable to modify id or internal version', async () => {
        const req = { params: { id: "6974576B526AC6FB45272692" }, body: { data: { _id: "123", __v: 1, createdAt: "0", updatedAt: "1" } } };
        let mockProjectsCopy = mockProjects;

        const index = mockProjectsCopy.findIndex(item => item._id == req.params.id);
        expect(index).not.toBe(-1);

        const originalProject = mockProjectsCopy[ index ];
        let newProject;
        Project.findByIdAndUpdate.mockImplementation(async (id, data, options) => {
            const i = mockProjectsCopy.findIndex(item => item._id == id);
            newProject = { ...mockProjectsCopy[ i ], ...data };
            mockProjectsCopy[ i ] = newProject;

            return (options.new) ? newProject : originalProject;
        });

        const resp = await projectControl.updateProject(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { name: originalProject.name, show: originalProject.show } });

        expect(newProject).toStrictEqual(originalProject);
    });

    test('should handle (id) error', async () => {
        const req = { params: { id: "stuff" }, body: { data: { name: "123" } } };

        Project.findByIdAndUpdate.mockRejectedValue(new Error("unable to cast id")).mockName('projectFindByIdAndUpdate');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await projectControl.updateProject(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`PROJECT ROUTE ERROR: unable to cast id!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });
})


