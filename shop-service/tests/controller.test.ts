import request from "supertest";
import express, { Express } from "express";
import controller from "../src/controller";
import defaultModel from "../src/models/default.model";
import shopsModel from "../src/models/shops.model";

// Mock models
jest.mock("../src/models/default.model", () => ({
  getRoutes: jest.fn(),
  getShopTypes: jest.fn(),
  getCustomers: jest.fn(),
}));
jest.mock("../src/models/shops.model", () => ({
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('../src/middlewares/authenticate', () => {
  return jest.fn((req, _res, next) => {
    req.user = { id: "u1", email: "test@mail.com", role: 1 };
    next();
  });
});

// Minimal express app for testing
const makeApp = (): Express => {
  const app = express();
  app.use(express.json());
  app.get("/data", controller.getData);
  app.get("/shops", controller.getAll);
  app.get("/shops/:id", controller.get);
  app.post("/shops", controller.add);
  app.put("/shops/:id", controller.edit);
  app.delete("/shops/:id", controller.delete);
  return app;
};

describe("Shop Controller Integration", () => {
  let app: Express;

  beforeAll(() => {
    app = makeApp();
  });

  afterEach(() => jest.clearAllMocks());

  it("GET /data should return routes, shoptypes, and customers", async () => {
    (defaultModel.getRoutes as jest.Mock).mockResolvedValue([{ id: "r1" }]);
    (defaultModel.getShopTypes as jest.Mock).mockResolvedValue([{ id: "t1" }]);
    (defaultModel.getCustomers as jest.Mock).mockResolvedValue([{ id: "c1" }]);

    const res = await request(app).get("/data");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
        code: 200,
        success: true,
        result: {
            routes: [{ id: "r1" }],
            shoptypes: [{ id: "t1" }],
            customers: [{ id: "c1" }],
        }
    });
  });

  it("GET /shops should return all shops", async () => {
    (shopsModel.getAll as jest.Mock).mockResolvedValue([{ id: "s1", name: "Shop 1" }]);

    const res = await request(app).get("/shops");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
        code: 200,
        success: true,
        result: [{ id: "s1", name: "Shop 1" }],
    });
  });

  it("GET /shops/:id should return one shop", async () => {
    (shopsModel.get as jest.Mock).mockResolvedValue({ id: "s1", name: "Shop 1" });

    const res = await request(app).get("/shops/s1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
        code: 200,
        success: true,
        result: { id: "s1", name: "Shop 1" },
    });
  });

  it("POST /shops should create a shop", async () => {
    (shopsModel.create as jest.Mock).mockResolvedValue({ id: "s1", name: "New Shop" });

        const res = await request(app)
            .post("/shops")
            .send({ name: "New Shop" })
            .set("user", JSON.stringify({ id: "u1" })); // simulate req.user

        expect(res.status).toBe(200);
        expect(shopsModel.create).toHaveBeenCalledWith(
            expect.objectContaining({ name: "New Shop" }),
            "u1",
            undefined
        );
        expect(res.body).toEqual({
            code: 200,
            success: true,
            result: { id: "s1", name: "New Shop" },
        });
    });

    it("PUT /shops/:id should update a shop", async () => {
    (shopsModel.update as jest.Mock).mockResolvedValue({ id: "s1", name: "Updated" });

        const res = await request(app)
            .put("/shops/s1")
            .send({ name: "Updated" })
            .set("user", JSON.stringify({ id: "u1" }));

        expect(res.status).toBe(200);
        expect(shopsModel.update).toHaveBeenCalledWith(
            "s1",
            expect.objectContaining({ name: "Updated" }),
            "u1",
            undefined
        );
        expect(res.body).toEqual({
            code: 200,
            success: true,
            result: { id: "s1", name: "Updated" },
        });
    });


  it("DELETE /shops/:id should soft delete a shop", async () => {
    (shopsModel.delete as jest.Mock).mockResolvedValue({ id: "s1", disabled: true });

    const res = await request(app).delete("/shops/s1");

    expect(res.status).toBe(200);
    expect(shopsModel.delete).toHaveBeenCalledWith("s1");
    expect(res.body).toEqual({
        code: 200,
        success: true,
        result: { "id": "s1", "disabled": true }
    });
  });
});