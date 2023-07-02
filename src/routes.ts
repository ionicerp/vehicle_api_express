import express from 'express';
import * as ctrl from './controllers';

const router = express.Router();
router.get('/list', ctrl.get);

export default router;
