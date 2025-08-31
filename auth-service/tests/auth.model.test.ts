import authService from "../src/models/auth.model";
import db from "../src/config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../src/utils/ApiError";
import config from "../src/config/config";
import {describe, expect, test} from '@jest/globals';

jest.mock("../src/config/db", () => ({
  user: {
    create: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Model (auth-service)", () => {
  afterEach(() => jest.clearAllMocks());

  describe("createUser", () => {
    it("should hash password and create user", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPw");
      (db.user.create as jest.Mock).mockResolvedValue({ id: "123" });

      const result = await authService.createUser("test@mail.com", "pw123", "Test");

      expect(bcrypt.hash).toHaveBeenCalledWith("pw123", 10);
      expect(db.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ email: "test@mail.com", password: "hashedPw" }),
        })
      );
      expect(result).toEqual({ id: "123" });
    });
  });

  describe("handleLogin", () => {
    it("should return user when password matches", async () => {
      (db.user.findUniqueOrThrow as jest.Mock).mockResolvedValue({
        id: "u1",
        password: "hashedPw",
        role: 1,
        email: "test@mail.com",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.handleLogin("test@mail.com", "pw123");

      expect(result).toMatchObject({ id: "u1", email: "test@mail.com" });
    });

    it("should throw ApiError if password mismatch", async () => {
      (db.user.findUniqueOrThrow as jest.Mock).mockResolvedValue({
        id: "u1",
        password: "hashedPw",
        role: 1,
        email: "test@mail.com",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.handleLogin("test@mail.com", "wrongpw")).rejects.toMatchObject({ message: "Invalid credentials", statusCode: 401 });
    });
  });

  describe("generateTokens", () => {
    it("should generate tokens and update refresh token", async () => {
      (jwt.sign as jest.Mock).mockImplementation((p) => `signed-${p.type}`);
      (db.user.update as jest.Mock).mockResolvedValue({});

      const result = await authService.generateTokens({
        id: "u1",
        role: 1,
        email: "user@mail.com",
      });

      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: "u1" },
        data: { token: expect.stringMatching(/^signed-/) },
      });
      expect(result.access.token).toBe("signed-access");
      expect(result.refresh.token).toBe("signed-refresh");
    });
  });

  describe("refresh", () => {
    it("should verify token and return new access token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id: "u1" });
      (db.user.findUniqueOrThrow as jest.Mock).mockResolvedValue({
        id: "u1",
        role: 1,
        email: "user@mail.com",
      });
      (jwt.sign as jest.Mock).mockImplementation((p) => `signed-${p.type}`);

      const result = await authService.refresh("refresh-token");

      expect(jwt.verify).toHaveBeenCalledWith("refresh-token", config.jwt.secret);
      expect(result.access.token).toMatch(/^signed-/)
    });
  });
});
