import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import DefaultResponse from "../utils/DefaultResponse";

import shoptypesModel from "../models/shoptypes.model";

const getAllShoptypes = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await shoptypesModel.getAll();
    DefaultResponse(res, 200, data);
});

const getShoptype = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await shoptypesModel.get(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

const addShoptype = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.body?.label) {
        const data = await shoptypesModel.create(req.body);
        DefaultResponse(res, 200, data);
    }
});

const editShoptype = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await shoptypesModel.update(req.params.id, req.body);
        DefaultResponse(res, 200, data);
    }
});

const deleteShoptype = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await shoptypesModel.delete(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

export default {
    get: getShoptype,
    getAll: getAllShoptypes,
    add: addShoptype,
    edit: editShoptype,
    delete: deleteShoptype,
};