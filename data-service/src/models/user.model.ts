import db from "../config/db";

const getUsers = async () => {
  return await db.user.findMany({
    where: {
      disabled: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      User_Role: {
        select: {
          id: true,
          label: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getUser = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      User_Role: {
        select: {
          id: true,
          label: true,
        },
      },
      createdAt: true,
      disabled: true,
    },
  });
};

const addUser = async (data: {
  email: string;
  name: string;
  password: string;
  role?: number;
}) => {
  return await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password, // make sure to hash before calling this!
      role: data.role ?? 2, // default role = 2
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};

const patchUser = async (
  id: string,
  data: Partial<{
    email: string;
    name: string;
    password: string;
    role: number;
    disabled: boolean;
  }>
) => {
  return await db.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      disabled: true,
    },
  });
};

const deleteUser = async (id: string) => {
  return await db.user.update({
    where: { id },
    data: { disabled: true }, // soft delete
    select: {
      id: true,
      email: true,
      name: true,
      disabled: true,
    },
  });
};

export default {
  get: getUser,
  getAll: getUsers,
  create: addUser,
  update: patchUser,
  delete: deleteUser,
};