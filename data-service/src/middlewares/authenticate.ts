import DefaultResponse from '../utils/DefaultResponse';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../config/types';
import jwt, { JwtPayload } from "jsonwebtoken"
import config from '../config/config';
import db from '../config/db';

const getAuthData = async (id:string) => {
    return await db.user.findUniqueOrThrow({
        where :{
            id: id,
        },
        select: {
            id: true,
            email: true,
            role: true
        }
    })
};

const authenticate = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (process.env.NODE_ENV === 'test') {
            req.user = { id: "u1", email: "test@mail.com", role: 1 };
            return next();
        }

        if (!token) {
            DefaultResponse(res, 401, "Authorization token is required");
            return;
        } else {
            jwt.verify(token, config.jwt.secret, async (err, user: JwtPayload | any) => {
                if(err) {
                    if(err.name === 'TokenExpiredError'){
                        return DefaultResponse(res, 401, "Authorization Token expired");
                    } else {
                        return DefaultResponse(res, 401, "Unexpected error occoured while authentication");
                    }
                }
                const currentUser = await getAuthData(user?.id);
                req.user = currentUser;
                next();
            });
        }

    } catch (err) {
        return DefaultResponse(res, 500, "Unexpected error occurred");
    }
};

export default authenticate