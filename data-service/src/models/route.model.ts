import db from "../config/db";

const getRoutes = async () => {
  return await db.route.findMany({
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

const getRoute = async (id: string) => {
  return await db.route.findUnique({
    where: { id },
    select: {
      id: true,
      label: true,
      createdAt: true,
      disabled: true,
    },
  });
};

const addRoute = async (data: { label: string }) => {
  return await db.route.create({
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

const patchRoute = async (
  id: string,
  data: Partial<{ label: string; disabled: boolean }>
) => {
  return await db.route.update({
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

const deleteRoute = async (id: string) => {
  // Soft delete
  return await db.route.update({
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
  get: getRoute,
  getAll: getRoutes,
  create: addRoute,
  update: patchRoute,
  delete: deleteRoute,
};