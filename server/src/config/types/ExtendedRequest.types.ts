import { Request } from "express";

export interface ExtendedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: number;
    }
}