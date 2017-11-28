// importing express lib
import express from 'express'

// importing centerclass
import centersClassController from '../controller/centerclass.js'

// importing router for center manager
const centerRouter = express.Router();

centerRouter.route('/')
/**
  * @swagger
  * /users:
  *   post:
  *     summary: Creates a new user
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - username
  *             - password
  *           properties:
  *             username:
  *               type: string
  *             password:
  *               type: password
  *           example: {
  *             "username": "someUser",
  *             "password": "somePassword"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             username:
  *               type: string
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "username": "someuser"
  *           }
  *       409:
  *         description: When the username is already in use
  */
    // create a new center
    .post(centersClassController.addNewcenter)
    //get all centers
    /**
      * @swagger
      * /users:
      *   get:
      *     summary: Creates a new user
      *     description:
      *       "Required roles: `admin`"
      *     tags:
      *       - Users
      *     parameters:
      *       - name: body
      *         in: body
      *         required: true
      *         schema:
      *           type: object
      *           required:
      *             - username
      *             - password
      *           properties:
      *             username:
      *               type: string
      *             password:
      *               type: password
      *           example: {
      *             "username": "someUser",
      *             "password": "somePassword"
      *           }
      *     responses:
      *       200:
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: integer
      *             username:
      *               type: string
      *         examples:
      *           application/json: {
      *             "id": 1,
      *             "username": "someuser"
      *           }
      *       409:
      *         description: When the username is already in use
      */
    .get(centersClassController.getAllCenters)


centerRouter.route('/:centerid')
/**
  * @swagger
  * /users/{id}:
  *   get:
  *     summary: Creates a new user
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - username
  *             - password
  *           properties:
  *             username:
  *               type: string
  *             password:
  *               type: password
  *           example: {
  *             "username": "someUser",
  *             "password": "somePassword"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             username:
  *               type: string
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "username": "someuser"
  *           }
  *       409:
  *         description: When the username is already in use
  */
    .get(centersClassController.getACenter)
    /**
      * @swagger
      * /users:
      *   put:
      *     summary: Creates a new user
      *     description:
      *       "Required roles: `admin`"
      *     tags:
      *       - Users
      *     parameters:
      *       - name: body
      *         in: body
      *         required: true
      *         schema:
      *           type: object
      *           required:
      *             - username
      *             - password
      *           properties:
      *             username:
      *               type: string
      *             password:
      *               type: password
      *           example: {
      *             "username": "someUser",
      *             "password": "somePassword"
      *           }
      *     responses:
      *       200:
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: integer
      *             username:
      *               type: string
      *         examples:
      *           application/json: {
      *             "id": 1,
      *             "username": "someuser"
      *           }
      *       409:
      *         description: When the username is already in use
      */
    .put(centersClassController.editACenter)

export default centerRouter;
