import express from 'express';
import { Router } from 'express';

import shopsController from './controller';
import validate from './middlewares/validate';

import shopVaidation from './validations';
import authenticate from './middlewares/authenticate';
import rolerestrict from './middlewares/rolerestrict';
import handleFileUpload from './middlewares/handleFileUpload';

const router: Router = express.Router();

router.use(authenticate);

router.get('/', shopsController.getAll);
router.get('/:id', validate(shopVaidation.getShop), shopsController.get);
router.post('/', handleFileUpload("/"), validate(shopVaidation.addShop), shopsController.add);
router.patch('/:id', handleFileUpload("/"), validate(shopVaidation.updateShop), shopsController.edit);
router.delete('/:id', validate(shopVaidation.deleteShop), rolerestrict([1]), shopsController.delete);


export default router;