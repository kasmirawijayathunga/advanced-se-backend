import DefaultResponse from '../utils/DefaultResponse';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../config/types';

const rolerestrict = (roles:number[]) => (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            return DefaultResponse(res, 403, "This action is not allowed");
        }
    } catch (err) {
        return DefaultResponse(res, 500, "Unexpected error occurred");
    }
};

export default rolerestrict