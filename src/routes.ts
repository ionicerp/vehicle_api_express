import express from 'express';
// import * as ctrl from './controllers';
import * as vehicleController from './controller_vehicle';
// import { authenticate } from './common';
import { checkJwt } from './authzero';

const router = express.Router();
// router.get('/list', ctrl.get);
// router.post('/login', ctrl.postApiLogin)
// router.get('/private', checkJwt, ctrl.privateCheck);
// router.get('/environmentvalue', checkJwt, ctrl.getSampleEnvValue);
// router.get('/get', checkJwt, ctrl.getVehicle);
// router.post('/create', checkJwt, ctrl.createVehicle);

// router.post('/create', checkJwt, vehicleController.createVehicle);
// router.get('/list', checkJwt, vehicleController.getAllVehicles);
// router.get('/get/:id', checkJwt, vehicleController.getSingleVehicle);
// router.put('/update/:id', checkJwt, vehicleController.updateVehicle);
// router.delete('/delete/:id', checkJwt, vehicleController.deleteVehicle);
// router.get('/search', checkJwt, vehicleController.searchVehicles);

// Create a new vehicle
router.post('/v1', checkJwt, vehicleController.createVehicle);

// Get all vehicles or search vehicles based on query parameters
router.get('/v1', checkJwt, vehicleController.getAllVehicles);

// Get a single vehicle by ID
router.get('/v1/:id', checkJwt, vehicleController.getSingleVehicle);

// Update a specific vehicle by ID
router.put('/v1/:id', checkJwt, vehicleController.updateVehicle);

// Delete a specific vehicle by ID
router.delete('/v1/:id', checkJwt, vehicleController.deleteVehicle);

// get    https://api.ionicerp.com/vehicle/v1/list
// get    https://api.ionicerp.com/vehicle/v1/search

// get    https://api.ionicerp.com/vehicle/v1/168
// post   https://api.ionicerp.com/vehicle/v1/create
// put    https://api.ionicerp.com/vehicle/v1/168
// delete https://api.ionicerp.com/vehicle/v1/168

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
