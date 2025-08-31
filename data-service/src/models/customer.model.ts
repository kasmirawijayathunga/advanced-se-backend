import db from "../config/db";

const getCustomers = async () => {
  return await db.customer.findMany({
    where: {
      disabled: false,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getCustomer = async (id: string) => {
  return await db.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      disabled: true,
    },
  });
};

const addCustomer = async (data: { name: string }) => {
  return await db.customer.create({
    data: {
      name: data.name,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
};

const patchCustomer = async (
  id: string,
  data: Partial<{ name: string; disabled: boolean }>
) => {
  return await db.customer.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      createdAt: true,
      disabled: true,
    },
  });
};

const deleteCustomer = async (id: string) => {
  // Soft delete
  return await db.customer.update({
    where: { id },
    data: { disabled: true },
    select: {
      id: true,
      name: true,
      disabled: true,
    },
  });
};

export default {
  get: getCustomer,
  getAll: getCustomers,
  create: addCustomer,
  update: patchCustomer,
  delete: deleteCustomer,
};