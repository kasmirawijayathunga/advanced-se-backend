import { Response } from "express";
import { ExtendedRequest } from "./config/types";
import catchAsync from "./utils/catchAsync";
import DefaultResponse from "./utils/DefaultResponse";

import defaultModel from "./models/default.model";
import shopsModel from "./models/shops.model";

const getData = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const getRoutes = await defaultModel.getRoutes();
    const getShopTypes = await defaultModel.getShopTypes();
    const getCustomers = await defaultModel.getCustomers();
    const data = {
        routes: getRoutes,
        shoptypes: getShopTypes,
        customers: getCustomers,
    }
    DefaultResponse(res, 200, data)
});

const getAllShops = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await shopsModel.getAll()
    DefaultResponse(res, 200, data)
});

const getShop = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if(req.params.id){
        const data = await shopsModel.get(req.params.id)
        DefaultResponse(res, 200, data)
    }
});

const addShop = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if(req.user){
        const data = await shopsModel.create(req.body, req.user.id, req.files)
        DefaultResponse(res, 200, data)
    }
});

const editShop = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if(req.params.id && req.user){
        const data = await shopsModel.update(req.params.id, req.body, req.user.id, req.files)
        DefaultResponse(res, 200, data)
    }
});

const deleteShop = catchAsync(async (req: ExtendedRequest, res: Response) => {
    if(req.params.id){
        const data = await shopsModel.delete(req.params.id)
        DefaultResponse(res, 200, data)
    }
});

export default {
    getData: getData,
    get: getShop,
    getAll: getAllShops,
    add: addShop,
    edit: editShop,
    delete: deleteShop
}