import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../config/types";
import multer from "multer";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import mime from 'mime';

const allowedFileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
];

const handleFileUpload = (path: string) => (req: ExtendedRequest, res: Response, next: NextFunction) => {
    //Define where project photos will be stored
    const storage = multer.diskStorage({

        destination: function (request, file, callback) {
            callback(null, `./public/uploads${path}`);
        },
        filename: function (request, file, callback) {
            const filename = `${req.user?.id}_${Date.now()}.${mime.getExtension(file.mimetype)}`;
            callback(null, filename)
        }

    });

    // Function to upload project images
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 10000000 // 10MB -> 1000000 Bytes = 1 MB
        },
        fileFilter: (req, file, cb) => {
            if (allowedFileTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
                return;
            }
        }
    }).fields([
        { name: 'img1', maxCount: 1 },
        { name: 'img2', maxCount: 1 },
        { name: 'img3', maxCount: 1 },
        { name: 'img4', maxCount: 1 },
        { name: 'img5', maxCount: 1 }
    ]);

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error(err);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while handling reciept upload.");
        } else {
            next();
        }
    });
}

export default handleFileUpload;