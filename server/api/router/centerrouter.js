// importing express lib
import express from 'express';

// importing centerclass
import centersClassController from '../controller/centerclass.js';

// importing router for center manager
const centerRouter = express.Router();

centerRouter.route('/')

  .get(centersClassController.getAllCenters);


centerRouter.route('/:centerid')

  .put(centersClassController.editACenter)
  .get(centersClassController.getACenter);

export default centerRouter;
