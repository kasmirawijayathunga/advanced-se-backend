import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import DefaultResponse from "../utils/DefaultResponse";

import userModel from "../models/user.model";

const getAllUsers = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await userModel.getAll();
    DefaultResponse(res, 200, data);
});

const getUser = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await userModel.get(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

const addUser = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.body?.email && req.body?.name && req.body?.password) {
        const data = await userModel.create(req.body);
        DefaultResponse(res, 200, data);
    }
});

const editUser = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await userModel.update(req.params.id, req.body);
        DefaultResponse(res, 200, data);
    }
});

const deleteUser = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await userModel.delete(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

export default {
    get: getUser,
    getAll: getAllUsers,
    add: addUser,
    edit: editUser,
    delete: deleteUser,
};
