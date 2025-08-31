import request from "supertest";
import express from "express";
import authController from "../src/controller";
import authModel from "../src/models/auth.model";
import bodyParser from "body-parser";

// Mock the auth model methods
jest.mock("../src/models/auth.model");

const app = express();
app.use(bodyParser.json());

// Setup routes for testing
app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.post("/auth", authController.auth);

describe("Auth Controller Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /signup should create a user", async () => {
    (authModel.createUser as jest.Mock).mockResolvedValue({
      id: "u1",
      email: "test@mail.com",
      name: "Test User"
    });

    const res = await request(app)
      .post("/signup")
      .send({
        email: "test@mail.com",
        password: "password123",
        name: "Test User"
      });

    expect(res.status).toBe(200);
    expect(authModel.createUser).toHaveBeenCalledWith(
      "test@mail.com",
      "password123",
      "Test User"
    );
    expect(res.body).toEqual({
      code: 200,
      success: true,
      result: {
        id: "u1",
        email: "test@mail.com",
        name: "Test User"
      }
    });
  });

  it("POST /login should return tokens", async () => {
    const mockUser = { id: "u1", email: "test@mail.com", role: 1, name: "Test User" };
    const mockTokens = {
      id: "u1",
      email: "test@mail.com",
      role: 1,
      access: { token: "access-token", expire: "time" },
      refresh: { token: "refresh-token", expire: "time" }
    };

    (authModel.handleLogin as jest.Mock).mockResolvedValue(mockUser);
    (authModel.generateTokens as jest.Mock).mockResolvedValue(mockTokens);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@mail.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(authModel.handleLogin).toHaveBeenCalledWith("test@mail.com", "password123");
    expect(authModel.generateTokens).toHaveBeenCalledWith(mockUser);
    expect(res.body).toEqual({
      code: 200,
      success: true,
      result: mockTokens
    });
  });

  it("POST /auth should refresh token", async () => {
    const mockRefreshResult = {
      id: "u1",
      email: "test@mail.com",
      role: 1,
      access: { token: "new-access", expire: "time" }
    };

    (authModel.refresh as jest.Mock).mockResolvedValue(mockRefreshResult);

    const res = await request(app)
      .post("/auth")
      .send({ token: "refresh-token" });

    expect(res.status).toBe(200);
    expect(authModel.refresh).toHaveBeenCalledWith("refresh-token");
    expect(res.body).toEqual({
      code: 200,
      success: true,
      result: mockRefreshResult
    });
  });
});
