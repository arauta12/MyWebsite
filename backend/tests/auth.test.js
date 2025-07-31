const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const authControls = require('../controllers/auth.controller');
const mockUsers = require('./mockUsers');

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

beforeAll(() => {
    bcrypt.compare.mockImplementation(async (pass1, pass2) => {
        return pass1 === pass2;
    });
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('login test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        clearCookie: jest.fn(),
        cookie: jest.fn(),
    };

    test('should login with name and password', async () => {
        const username = mockUsers[ 0 ].username;
        const password = mockUsers[ 0 ].password;
        const user = { ...mockUsers[ 0 ], save: jest.fn().mockResolvedValue(true) };
        const req = { body: { data: { username, password } }, cookies: {} };

        User.findOne.mockResolvedValue(user);
        jwt.sign.mockReturnValue("token testx");
        const resp = await authControls.login(req, res);
        expect(bcrypt.compare.mock.calls).toHaveLength(1);
        expect(bcrypt.compare.mock.calls[ 0 ]).toStrictEqual([ password, user.password ]);

        expect(jwt.sign.mock.calls).toHaveLength(1);
        expect(jwt.sign.mock.calls[ 0 ]).toStrictEqual([ { username, role: mockUsers[ 0 ].role }, process.env.JWT_SECRET, { expiresIn: '10h' } ]);

        expect(user.save).toHaveBeenCalled();

        expect(res.clearCookie.mock.calls).toHaveLength(1);
        expect(res.cookie.mock.calls).toHaveLength(1);
        expect(res.cookie.mock.calls[ 0 ][ 1 ]).toBe("token testx");

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { username, role: mockUsers[ 0 ].role } });
    });

    test('should fail login without password or username', async () => {
        const req = { body: { data: { username: "hi" } }, cookies: {} };

        User.findOne.mockRejectedValue(null);

        const resp = await authControls.login(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing username or password!" });
    });

    test('should fail with invalid username', async () => {
        const req = { body: { data: { username: "hi", password: "0eej" } }, cookies: {} };

        User.findOne.mockResolvedValue(null);

        const resp = await authControls.login(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials!" });
    });

    test('should fail with wrong password', async () => {
        const req = { body: { data: { username: mockUsers[ 0 ].username, password: "wrong" } }, cookies: {} };

        User.findOne.mockResolvedValue(mockUsers[ 0 ].username);

        const resp = await authControls.login(req, res);

        expect(bcrypt.compare.mock.calls).toHaveLength(1);
        expect(await bcrypt.compare.mock.results[ 0 ].value).toBe(false);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials!" });

    });

    test('should fail login without data object', async () => {
        const req = { body: {}, cookies: { jwt_token: "" } };

        User.findOne.mockResolvedValue(null);

        const resp = await authControls.login(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing username or password!" });
    });

    test('should fail login with empty data', async () => {
        const req = { body: { data: {} }, cookies: { jwt_token: "" } };

        User.findOne.mockResolvedValue(null);

        const resp = await authControls.login(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(400);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Missing username or password!" });
    });

    test('should login with valid jwtToken', async () => {
        const req = { body: {}, cookies: { jwt_token: "tokenxx" } };
        const user = mockUsers[ 0 ];

        User.findOne.mockResolvedValue(user);
        jwt.verify.mockReturnValue({ exp: Math.ceil(Date.now() / 1000) + 10, username: user.username, role: user.role });

        const resp = await authControls.login(req, res);

        expect(jwt.verify.mock.calls).toHaveLength(1);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { username: user.username, role: user.role } });
    });

    test('should login with user & pass with expired token', async () => {
        const username = mockUsers[ 0 ].username;
        const password = mockUsers[ 0 ].password;
        const user = { ...mockUsers[ 0 ], save: jest.fn().mockResolvedValue(true) };
        const req = { body: { data: { username, password } }, cookies: { jwt_token: "invalidated" } };

        User.findOne.mockResolvedValue(user);
        jwt.sign.mockReturnValue("token testx");
        jwt.verify.mockImplementation(() => { throw new Error("Expired token"); });
        const resp = await authControls.login(req, res);

        expect(jwt.verify.mock.calls).toHaveLength(1);

        expect(res.clearCookie.mock.calls).toHaveLength(2);
        expect(res.cookie.mock.calls).toHaveLength(1);
        expect(res.cookie.mock.calls[ 0 ][ 1 ]).toBe("token testx");

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: { username, role: mockUsers[ 0 ].role } });
    });

    test('should fail with invalid user & pass with expired token', async () => {
        const username = mockUsers[ 0 ].username;
        const password = "wrong pass";
        const user = { ...mockUsers[ 0 ], save: jest.fn().mockResolvedValue(true) };
        const req = { body: { data: { username, password } }, cookies: { jwt_token: "invalidated" } };

        User.findOne.mockResolvedValue(user);
        jwt.sign.mockReturnValue("token testx");
        jwt.verify.mockImplementation(() => { throw new Error("Expired token"); });
        const resp = await authControls.login(req, res);

        expect(jwt.verify.mock.calls).toHaveLength(1);

        expect(bcrypt.compare.mock.calls).toHaveLength(1);
        expect(bcrypt.compare.mock.calls[ 0 ]).toStrictEqual([ password, user.password ]);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials!" });
    });

    test('should catch the error', async () => {
        const req = { body: { data: { username: mockUsers[ 0 ].username, password: mockUsers[ 0 ].password } }, cookies: {} };

        User.findOne.mockRejectedValue(new Error("Networking error!"));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const resp = await authControls.login(req, res);

        expect(consoleSpy.mock.calls).toHaveLength(1);
        expect(consoleSpy.mock.calls[ 0 ][ 0 ]).toBe(chalk.red(`LOGIN ERROR: Networking error!`));

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(500);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Something went wrong. Try again." });
    });
});

describe('logout test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        clearCookie: jest.fn(),
        cookie: jest.fn(),
    };

    test('should successfully logout', async () => {
        const req = { body: {}, cookies: { jwt_token: "test tokenyyx" } };
        jwt.verify.mockReturnValue({
            username: mockUsers[ 0 ].username,
            role: mockUsers[ 0 ].role,
            exp: Math.ceil(Date.now() / 1000) + 100
        });
        User.findOne.mockResolvedValue(mockUsers[ 0 ]);

        const resp = await authControls.logout(req, res);

        expect(res.clearCookie.mock.calls).toHaveLength(1);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(200);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "success", data: mockUsers[ 0 ].username });

    });

    test('should fail to logout with invalid credentials', async () => {
        const req = { body: {}, cookies: { jwt_token: "testxx" } };
        jwt.verify.mockReturnValue({
            username: "wrong",
            role: "again",
            exp: Math.ceil(Date.now() / 1000) + 100
        });

        User.findOne.mockResolvedValue(null);

        const resp = await authControls.logout(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials." });
    });

    test('should fail with no token', async () => {
        const req = { body: {}, cookies: {} };
        jwt.verify.mockReturnValue(new Error("Invalid token!"));

        const resp = await authControls.logout(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials." });
    });

    test('should fail with expired token', async () => {
        const req = { body: {}, cookies: { jwt_token: "testxx" } };
        jwt.verify.mockImplementation(() => { throw new Error("Expired token"); });

        const resp = await authControls.logout(req, res);

        expect(resp.status.mock.calls).toHaveLength(1);
        expect(resp.status.mock.calls[ 0 ][ 0 ]).toBe(401);

        expect(resp.json.mock.calls).toHaveLength(1);
        expect(resp.json.mock.calls[ 0 ][ 0 ]).toStrictEqual({ status: "failed", message: "Invalid credentials." });
    });
});