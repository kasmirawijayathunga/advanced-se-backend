import db from "../config/db";

const getShoptypes = async () => {
  return await db.shoptypes.findMany({
    where: {
      disabled: false,
    },
    select: {
      id: true,
      label: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getShoptype = async (id: string) => {
  return await db.shoptypes.findUnique({
    where: { id },
    select: {
      id: true,
      label: true,
      createdAt: true,
      disabled: true,
    },
  });
};

const addShoptype = async (data: { label: string }) => {
  return await db.shoptypes.create({
    data: {
      label: data.label,
    },
    select: {
      id: true,
      label: true,
      createdAt: true,
    },
  });
};

const patchShoptype = async (
  id: string,
  data: Partial<{ label: string; disabled: boolean }>
) => {
  return await db.shoptypes.update({
    where: { id },
    data,
    select: {
      id: true,
      label: true,
      createdAt: true,
      disabled: true,
    },
  });
};

const deleteShoptype = async (id: string) => {
  // Soft delete
  return await db.shoptypes.update({
    where: { id },
    data: { disabled: true },
    select: {
      id: true,
      label: true,
      disabled: true,
    },
  });
};

export default {
  get: getShoptype,
  getAll: getShoptypes,
  create: addShoptype,
  update: patchShoptype,
  delete: deleteShoptype,
};