// now we can set the route path & initialize the API

import express from 'express';
import seatsController from './controller/seatsController'
const router = express.Router();


router.get('/api/currentSeats', seatsController.getCurentSeats);
module.exports = router;