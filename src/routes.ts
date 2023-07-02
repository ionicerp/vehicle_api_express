import express from 'express';
import * as ctrl from './controllers';
import { authenticate } from './common';

const router = express.Router();
router.get('/list', authenticate, ctrl.get);
router.post('/login', ctrl.postApiLogin)

export default router;
