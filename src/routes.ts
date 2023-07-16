import express from 'express';
import * as ctrl from './controllers';
import * as vehicleController from './controller_vehicle';
import { authenticate } from './common';
import { checkJwt } from './authzero';

const router = express.Router();
// router.get('/list', ctrl.get);
router.post('/login', ctrl.postApiLogin)
router.get('/private', checkJwt, ctrl.privateCheck);
router.get('/environmentvalue', checkJwt, ctrl.getSampleEnvValue);
// router.get('/get', checkJwt, ctrl.getVehicle);
// router.post('/create', checkJwt, ctrl.createVehicle);

router.post('/create', checkJwt, vehicleController.createVehicle);
router.get('/list', checkJwt, vehicleController.getAllVehicles);
router.get('/get/:id', checkJwt, vehicleController.getSingleVehicle);
router.put('/update/:id', checkJwt, vehicleController.updateVehicle);
router.delete('/delete/:id', checkJwt, vehicleController.deleteVehicle);
router.get('/search', checkJwt, vehicleController.searchVehicles);

// create a vehicle
// get all vehicles
// get a single vehicle
// update a vehicle
// delete a vehicle
// search a vehicle

// get vehicle makes
// get vehicle models
// get vehicle years

export default router;
