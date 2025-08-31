import shopsModel from "../src/models/shops.model";
import db from "../src/config/db";
import { Shop } from "../src/config/types/shop.types";
import { UploadFile } from "../src/config/types/upload.types";

jest.mock("../src/config/db", () => ({
  shops: {
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Shops Model (shop-service)", () => {
  afterEach(() => jest.clearAllMocks());

  it("should get all shops", async () => {
    (db.shops.findMany as jest.Mock).mockResolvedValue([{ id: "s1", name: "Shop 1" }]);

    const result = await shopsModel.getAll();

    expect(db.shops.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { disabled: false } })
    );
    expect(result).toEqual([{ id: "s1", name: "Shop 1" }]);
  });

  it("should get a single shop", async () => {
    (db.shops.findUniqueOrThrow as jest.Mock).mockResolvedValue({ id: "s1", name: "Shop 1" });

    const result = await shopsModel.get("s1");

    expect(db.shops.findUniqueOrThrow).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "s1" } })
    );
    expect(result).toEqual({ id: "s1", name: "Shop 1" });
  });

  it("should create a shop with phones and images", async () => {
    (db.shops.create as jest.Mock).mockResolvedValue({ id: "s1" });

    const shop: Partial<Shop> = {
      name: "Shop Test",
      address: "Address",
      longitude: "12.34",
      latitude: "56.78",
      createdAt: new Date(),
      email: "test@mail.com",
      phone1: "111",
      phone1_call: true,
      customer_id: "c1",
      route_id: "r1",
      type_id: "t1",
    };
    const files: UploadFile = {
      img1: [{ fieldname: "img1", filename: "f1.png" }],
    } as any;

    const result = await shopsModel.create(shop as Shop, "user1", files);

    expect(db.shops.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: "Shop Test",
          address: "Address",
          Shops_Phone: { create: expect.any(Object) },
          Shops_Images: { create: expect.any(Object) },
        }),
      })
    );
    expect(result).toEqual({ id: "s1" });
  });

  it("should update a shop", async () => {
    (db.shops.update as jest.Mock).mockResolvedValue({ id: "s1" });

    const shop: Partial<Shop> = {
      name: "Shop Updated",
      phone1: "222",
    };
    const files: UploadFile = {} as any;

    const result = await shopsModel.update("s1", shop as Shop, "user1", files);

    expect(db.shops.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "s1" },
        data: expect.objectContaining({
          name: "Shop Updated",
          Shops_Updates: { create: { userId: "user1" } },
        }),
      })
    );
    expect(result).toEqual({ id: "s1" });
  });

  it("should soft delete a shop", async () => {
    (db.shops.update as jest.Mock).mockResolvedValue({ id: "s1", disabled: true });

    const result = await shopsModel.delete("s1");

    expect(db.shops.update).toHaveBeenCalledWith({
      where: { id: "s1" },
      data: { disabled: true },
    });
    expect(result).toEqual({ id: "s1", disabled: true });
  });
});
