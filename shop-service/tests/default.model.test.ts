import defaultModel from "../src/models/default.model";
import db from "../src/config/db";

jest.mock("../src/config/db", () => ({
  route: { findMany: jest.fn() },
  shoptypes: { findMany: jest.fn() },
  customer: { findMany: jest.fn() },
}));

describe("Default Model (shop-service)", () => {
  afterEach(() => jest.clearAllMocks());

  it("should get routes", async () => {
    (db.route.findMany as jest.Mock).mockResolvedValue([{ id: "r1", label: "Route 1" }]);

    const result = await defaultModel.getRoutes();

    expect(db.route.findMany).toHaveBeenCalledWith({
      where: { disabled: false },
      select: { id: true, label: true },
    });
    expect(result).toEqual([{ id: "r1", label: "Route 1" }]);
  });

  it("should get shop types", async () => {
    (db.shoptypes.findMany as jest.Mock).mockResolvedValue([{ id: "t1", label: "Retail" }]);

    const result = await defaultModel.getShopTypes();

    expect(db.shoptypes.findMany).toHaveBeenCalledWith({
      where: { disabled: false },
      select: { id: true, label: true },
    });
    expect(result).toEqual([{ id: "t1", label: "Retail" }]);
  });

  it("should get customers", async () => {
    (db.customer.findMany as jest.Mock).mockResolvedValue([{ id: "c1", name: "John" }]);

    const result = await defaultModel.getCustomers();

    expect(db.customer.findMany).toHaveBeenCalledWith({
      where: { disabled: false },
      select: { id: true, name: true },
    });
    expect(result).toEqual([{ id: "c1", name: "John" }]);
  });
});
