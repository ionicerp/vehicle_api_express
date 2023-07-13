import express from 'express';
import * as ctrl from './controllers';
import { authenticate } from './common';
import { checkJwt } from './authzero';

const router = express.Router();
router.get('/list', ctrl.get);
router.post('/login', ctrl.postApiLogin)
router.get('/private', checkJwt, ctrl.privateCheck);
router.get('/environmentvalue', checkJwt, ctrl.getSampleEnvValue);
router.get('/get', checkJwt, ctrl.getVehicle);
router.post('/create', checkJwt, ctrl.createVehicle);

export default router;
