import express from 'express';
import * as ctrl from './controllers';
import { authenticate } from './common';
import { checkJwt } from './authzero';

const router = express.Router();
router.get('/list', authenticate, ctrl.get);
router.post('/login', ctrl.postApiLogin)
router.get('/private', checkJwt, ctrl.privateCheck);

export default router;
