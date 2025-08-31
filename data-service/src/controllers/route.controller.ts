import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import DefaultResponse from "../utils/DefaultResponse";

import routeModel from "../models/route.model";

const getAllRoutes = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await routeModel.getAll();
    DefaultResponse(res, 200, data);
});

const getRoute = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await routeModel.get(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

const addRoute = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.body?.label) {
        const data = await routeModel.create(req.body);
        DefaultResponse(res, 200, data);
    }
});

const editRoute = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await routeModel.update(req.params.id, req.body);
        DefaultResponse(res, 200, data);
    }
});

const deleteRoute = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await routeModel.delete(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

export default {
    get: getRoute,
    getAll: getAllRoutes,
    add: addRoute,
    edit: editRoute,
    delete: deleteRoute,
};
