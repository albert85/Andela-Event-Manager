// importing express lib
import express from 'express';

// importing centerclass
import centersClassController from '../controller/centerclass';

// importing router for center manager
const centerRouter = express.Router();

centerRouter.route('/')
/**
  * @swagger
  * /api/v1/centers/:
  *   post:
  *     summary: Creates a center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Admin
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - capacity
  *             - amount
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *           example: {
  *             "message":  "Center sucessful created",
  *             "name": "Apollan Hall",
  *             "location": "Ikeja",
  *             "capacity": 2000,
  *             "amount": 2000
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *         examples:
  *           application/json: {
	*             "message": "sucessful deleted",
  *             "id": 1,
  *             "name": "Adenike Hall",
  *             "location": "ikeja",
  *             "capacity": 500,
  *             "amount": 200000
  *           }
  *       400:
  *         description: When center details already exist
  */

// create a new center
  .post(centersClassController.addNewcenter)

  /**
  * @swagger
  * /api/v1/centers/:
  *   get:
  *     summary: Get all centers
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Admin
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - capacity
  *             - amount
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *           example: {
  *    	        "message":  "sucessful",
  *             "name": "Apollan Hall",
  *             "location": "Ikeja",
  *             "capacity": 2000,
  *             "amount": 2000
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *         examples:
  *           application/json: {
	*             "message": "sucessful",
  *             "id": 1,
  *             "name": "Adenike Hall",
  *             "location": "ikeja",
  *             "capacity": 500,
  *             "amount": 200000
  *           }
  *       400:
  *         description: When center does not exist
  */

  // get all centers
  .get(centersClassController.getAllCenters);


centerRouter.route('/:centerid')

/**
  * @swagger
  * /api/v1/centers/:centerId:
  *   get:
  *     summary: Get a center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Admin
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - capacity
  *             - amount
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *           example: {
  *    	        "message":  "sucessful",
  *             "name": "Apollan Hall",
  *             "location": "Ikeja",
  *             "capacity": 2000,
  *             "amount": 2000
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *         examples:
  *           application/json: {
	*             "message": "sucessful",
  *             "id": 1,
  *             "name": "Adenike Hall",
  *             "location": "ikeja",
  *             "capacity": 500,
  *             "amount": 200000
  *           }
  *       400:
  *         description: When center does not exist
  */


  .get(centersClassController.getACenter)

/**
  * @swagger
  * /api/v1/centers/:centerId:
  *   put:
  *     summary: Update a center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Admin
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - capacity
  *             - amount
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *           example: {
  *    	        "message":  "Center sucessfully updated",
  *             "name": "Apollan Hall",
  *             "location": "Ikeja",
  *             "capacity": 2000,
  *             "amount": 2000
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *         examples:
  *           application/json: {
	*             "message": "sucessful",
  *             "id": 1,
  *             "name": "Adenike Hall",
  *             "location": "ikeja",
  *             "capacity": 500,
  *             "amount": 200000
  *           }
  *       400:
  *         description: When center does not exist
  */

  .put(centersClassController.editACenter);

export default centerRouter;
