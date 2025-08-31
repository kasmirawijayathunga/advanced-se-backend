import express from 'express';
import { Router } from 'express';

import userController from './controllers/user.controller';
import customerController from './controllers/customer.controller';
import routeController from './controllers/route.controller';
import shoptypesController from './controllers/shoptypes.controller';

import validate from './middlewares/validate';
import authenticate from './middlewares/authenticate';
import rolerestrict from './middlewares/rolerestrict';

import userValidation from './validations/user.validation';
import customerValidation from './validations/customer.validation';
import routeValidation from './validations/route.validation';
import shoptypesValidation from './validations/shoptypes.validation';

const router: Router = express.Router();

router.use(authenticate);

/* ------------------ USERS ------------------ */
router.get('/users', userController.getAll);
router.get('/users/:id', validate(userValidation.getUser), userController.get);
router.post('/users', validate(userValidation.addUser), rolerestrict([1]), userController.add);
router.patch('/users/:id', validate(userValidation.updateUser), rolerestrict([1]), userController.edit);
router.delete('/users/:id', validate(userValidation.deleteUser), rolerestrict([1]), userController.delete);

/* ------------------ CUSTOMERS ------------------ */
router.get('/customers', customerController.getAll);
router.get('/customers/:id', validate(customerValidation.getCustomer), customerController.get);
router.post('/customers', validate(customerValidation.addCustomer), customerController.add);
router.patch('/customers/:id', validate(customerValidation.updateCustomer), customerController.edit);
router.delete('/customers/:id', validate(customerValidation.deleteCustomer), customerController.delete);

/* ------------------ ROUTES ------------------ */
router.get('/routes', routeController.getAll);
router.get('/routes/:id', validate(routeValidation.getRoute), routeController.get);
router.post('/routes', validate(routeValidation.addRoute), routeController.add);
router.patch('/routes/:id', validate(routeValidation.updateRoute), routeController.edit);
router.delete('/routes/:id', validate(routeValidation.deleteRoute), routeController.delete);

/* ------------------ SHOP TYPES ------------------ */
router.get('/shoptypes', shoptypesController.getAll);
router.get('/shoptypes/:id', validate(shoptypesValidation.getShoptype), shoptypesController.get);
router.post('/shoptypes', validate(shoptypesValidation.addShoptype), shoptypesController.add);
router.patch('/shoptypes/:id', validate(shoptypesValidation.updateShoptype), shoptypesController.edit);
router.delete('/shoptypes/:id', validate(shoptypesValidation.deleteShoptype), shoptypesController.delete);

export default router;
