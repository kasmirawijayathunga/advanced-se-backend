import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import proxy from "express-http-proxy";

import { errorConverter, errorHandler } from './middlewares/error';
import DefaultResponse from './utils/DefaultResponse';

const app = express();

// set security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options(/.*/, cors());

// v1 api routes
const auth = proxy("http://localhost:8001");
const shops = proxy("http://localhost:8002");

app.use("/v1/auth", auth);
app.use("/v1/shops", shops);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    DefaultResponse(res, 404, 'Not found')
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;