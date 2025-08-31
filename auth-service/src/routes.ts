import express from 'express';
import { Router } from 'express';

import authController from './controller';

const router: Router = express.Router();

router.post('/', authController.auth);
router.post('/login', authController.login);
router.post('/signup', authController.signup);

export default router;