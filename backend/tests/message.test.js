const Message = require('../models/message.model');
const messageControl = require('../controllers/message.controller');
const mockMessages = require('./mockMessages');
const chalk = require('chalk');

jest.mock("../models/message.model");

describe('Get all messages', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should test', async () => {
        const req = {};
        Message.find.mockImplementation(async (filter, hideAttributes) => {
            const hiddenAttributes = hideAttributes.split(" ").map(key => key.substring(1));
            const displayMessages = mockMessages.map(message => {
                const modifiedMessage = { ...message };

                hiddenAttributes.forEach(key => {
                    if (key in modifiedMessage)
                        delete modifiedMessage[ key ];
                });

                return modifiedMessage;
            });

            return displayMessages;
        });

        const expectedMessages = mockMessages.map(message => {
            const { _id, __v, ...filteredMessage } = message;
            return filteredMessage;
        });

        const resp = await messageControl.getMessages(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: expectedMessages });

    });

    test('should catch error', async () => {
        const req = {};
        Message.find.mockRejectedValue(new Error("something")).mockName('messageFind');
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const resp = await messageControl.getMessages(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`MESSAGE ROUTE ERROR: something!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });

});

describe('Create a message', () => {

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully create a message', async () => {
        const name = "newName";
        const email = "hi@yahoo.com";
        const contents = "lorem";
        const newMessage = { _id: "4A85FBC4BA190A870C418649", __v: 0, name, email, contents };

        const req = { body: { data: { name, email, contents } } };
        Message.create.mockResolvedValue(newMessage);

        const resp = await messageControl.createMessage(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(201);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: name });

    });

    test('should fail if missing body', async () => {
        const req = {};
        Message.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await messageControl.createMessage(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });

    test('should fail if missing data object', async () => {
        const req = { body: {} };
        Message.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await messageControl.createMessage(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });

    test('should fail if data is empty', async () => {
        const req = { body: { data: {} } };
        Message.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await messageControl.createMessage(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });

    test('should check that message was created', async () => {
        const name = "newName";
        const email = "hi@yahoo.com";
        const contents = "lorem";

        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        const req = { body: { data: { name, email, contents } } };
        Message.create.mockRejectedValue(new Error("Something went wrong"));

        const resp = await messageControl.createMessage(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`MESSAGE ROUTE ERROR: Something went wrong!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });

    test('should fail if missing required fields', async () => {
        const req = { body: { data: { name: "fake name" } } };
        Message.create.mockRejectedValue(new Error("Missing required fields!"));

        const resp = await messageControl.createMessage(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing required fields!" });
    });
})

