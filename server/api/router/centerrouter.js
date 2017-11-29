// importing express lib
import express from 'express';

// importing centerclass
import centersClassController from '../controller/centerclass.js';

// importing router for center manager
const centerRouter = express.Router();

centerRouter.route('/')
// create a new center
.post(centersClassController.addNewcenter)
//get all centers
.get(centersClassController.getAllCenters)


centerRouter.route('/:centerid')
.get(centersClassController.getACenter)
.put(centersClassController.editACenter)

export default centerRouter;