/**
  * @swagger
  * /api/v1/users/signUp:
  *   post:
  *     summary: Register a new user
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - firstName
  *             - email
  *             - password
  *             - isAdmin
  *             - lastName
  *           properties:
  *             firstName:
  *               type: string
  *             email:
  *               type: string
  *             password:
  *               type: string
  *             isAdmin:
  *               type: boolean
  *             lastName:
  *               type: string
  *           example: {
  *             "firstName": "Anderson",
  *             "email": "you@example.com",
  *             "password": "password",
  *             "isAdmin": false,
  *             "lastName": "Steven"
  *           }
  *     responses:
  *       201:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             firstName:
  *               type: string
  *             lastName:
  *               type: string
  *             email:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "successful",
  *             "firstName": "Anderson",
  *             "lastName": "Steven",
  *             "email": "you@example.com"
  *           }
  *       400:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Resource not Created"
  *           }
  */

/**
  * @swagger
  * /api/v1/user/login:
  *   post:
  *     summary: Login users
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - email
  *             - password
  *           properties:
  *             email:
  *               type: string
  *             password:
  *               type: string
  *           example: {
  *             "email": "you@example.com",
  *             "password": "password",
  *           }
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             token:
  *               type: string
  *             userIdNo:
  *               type: integer
  *             role:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "successfully login",
  *             "token": "Andeskfhsjkgf132432j4g2jsfbrson",
  *             "userIdNo": "1",
  *             "role": "Admin"
  *           }
  *       401:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Wrong password"
  *           }
  */
/**
  * @swagger
  * /api/v1/user/recipientEmail:
  *   post:
  *     summary: Send users email notification
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
  *             - email
  *           properties:
  *             email:
  *               type: string
  *           example: {
  *             "email": "you@example.com"
  *           }
  *     responses:
  *       200:
  *         description: When notification is sent and successful
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "successfully sent"
  *           }
  *       400:
  *         description: When no record is found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "email not sent"
  *           }
  */

/**
  * @swagger
  * /api/v1/admin-role/{userId}:
  *   put:
  *     summary: Change user's role
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: userId
  *         in: path
  *         description: User's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - firstName
  *             - email
  *             - isAdmin
  *             - lastName
  *           properties:
  *             firstName:
  *               type: string
  *             email:
  *               type: string
  *             isAdmin:
  *               type: boolean
  *             lastName:
  *               type: string
  *           example: {
  *             "firstName": "you@example.com",
  *             "email": "you@example.com",
  *             "isAdmin": true,
  *             "lastName": "Steven",
  *           }
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             role:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "successfully login",
  *             "role": "Admin"
  *           }
  *       400:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Please check your details"
  *           }
  */

/**
  * @swagger
  * /api/v1/user/email/{userId}:
  *   get:
  *     summary: Get user's email address
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: userId
  *         in: path
  *         description: User's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When record is available
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             userEmail:
  *               type: object
  *               properties:
  *                 email:
  *                  type: string
  *                 name:
  *                  type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "userEmail": {
  *             email: "you@example.com",
  *             name: "Anderson",
  *             }
  *           }
  *       400:
  *         description: When record is not found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Resource not Found"
  *           }
  */

