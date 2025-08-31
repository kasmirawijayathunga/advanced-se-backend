import { Response } from "express";
import DefaultResponse from "./utils/DefaultResponse";
import { ExtendedRequest } from "./config/types";
import catchAsync from "./utils/catchAsync";
import authModel from "./models/auth.model";

const auth = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const data = await authModel.refresh(req.body.token)
    DefaultResponse(res, 200, data)
});

const login = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const { email, password } = req.body;
    const user = await authModel.handleLogin(email, password);
    const data = await authModel.generateTokens(user);
    DefaultResponse(res, 200, data)
});

const signup = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const { email, password, name } = req.body;
    const data = await authModel.createUser(email, password, name);
    DefaultResponse(res, 200, data)
});

export default {
    auth,
    login,
    signup
}