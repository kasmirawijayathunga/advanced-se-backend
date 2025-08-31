import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import DefaultResponse from "../utils/DefaultResponse";

import customerModel from "../models/customer.model";

const getAllCustomers = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await customerModel.getAll();
    DefaultResponse(res, 200, data);
});

const getCustomer = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await customerModel.get(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

const addCustomer = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.body?.name) {
        const data = await customerModel.create(req.body);
        DefaultResponse(res, 200, data);
    }
});

const editCustomer = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await customerModel.update(req.params.id, req.body);
        DefaultResponse(res, 200, data);
    }
});

const deleteCustomer = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if (req.params.id) {
        const data = await customerModel.delete(req.params.id);
        DefaultResponse(res, 200, data);
    }
});

export default {
    get: getCustomer,
    getAll: getAllCustomers,
    add: addCustomer,
    edit: editCustomer,
    delete: deleteCustomer,
};
