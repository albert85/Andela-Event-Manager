// importing express lib
import express from 'express'

// importing centerclass
import centersclasscontroller from '../controller/centerclass.js'

// importing router for center manager
const centerrouter = express.Router();

centerrouter.route('/')
    // create a new center
    .post(centersclasscontroller.addNewcenter)





export default centerrouter;