import express from 'express';
import centerDetails from '../controllers/CenterController';
import validator from '../controllers/Validator';
import auth from '../controllers/CheckAuth';

const app = express.Router();
// get all centers
app.get('/centers/:page&:limit', validator.validateParams, auth.checkIfAuthorize, centerDetails.getAllCenter);

// search for a center by name and location
app.post('/center/search', auth.checkIfAuthorize, centerDetails.searchCenterByNameAndLocation);

// creating new center
app.post('/centers', validator.creatCenterValidation, auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.create);

// updates a center's detail
app.put('/centers/:centerId', validator.updateCenterValidation, auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.updateACenterDetails);

// Get a center
app.get('/centers/:centerId', validator.validateCenterId, auth.checkIfAuthorize, centerDetails.getACenter);

// Get a center's event details
app.get('/center/:centerId/:page&:limit', validator.validateCenterEventDetail, auth.checkIfAuthorize, centerDetails.getACenterEventDetails);


export default app;
