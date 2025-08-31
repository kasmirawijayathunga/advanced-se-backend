import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes';

import shopController from './controller';

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

// v1 static files
app.use('/static', express.static('public'));

app.get('/data', shopController.getData);
// v1 api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    DefaultResponse(res, 404, 'Not found')
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;