/**
  * @swagger
  * /api/v1/centers:
  *   post:
  *     summary: Create a new center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
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
  *             - userId
  *             - centerUrl
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *             userId:
  *               type: integer
  *             centerUrl:
  *               type: string
  *           example: {
  *             "name": "Example Hall",
  *             "location": "Mount Everest",
  *             "capacity": 100,
  *             "amount": 1000.00,
  *             "userId": 1,
  *             "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
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
  *             centerDetail:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 location:
  *                   type: string
  *                 capacity:
  *                   type: integer
  *                 amount:
  *                   type: decimal
  *                 centerUrl:
  *                   type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "sucessfully added",
  *             "centerDetail": {
  *                 "name": "Example Hall",
  *             "location": "Mount Everest",
  *             "capacity": 100,
  *             "amount": 1000.00,
  *             "userId": 1,
  *             "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *
  *             }
  *
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
  *             "result": "Operation not implemented"
  *           }
  */
/**
  * @swagger
  * /api/v1/center/search:
  *   post:
  *     summary: Search for a new center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *           example: {
  *             "name": "Example Hall",
  *             "location": "Mount Everest",
  *           }
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             center:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 location:
  *                   type: string
  *                 capacity:
  *                   type: integer
  *                 amount:
  *                   type: decimal
  *                 centerUrl:
  *                   type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "centerDetail": {
  *               "name": "Example Hall",
  *               "location": "Mount Everest",
  *               "capacity": 100,
  *               "amount": 1000.00,
  *               "userId": 1,
  *               "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *
  *             }
  *
  *           }
  *       404:
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
  *             "result": "Center not found!!!"
  *           }
  */

/**
  * @swagger
  * /api/v1/centers/{page}&{limit}:
  *   get:
  *     summary: Get all centers
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
  *     parameters:
  *       - name: page
  *         in: path
  *         description: Number of records to skip
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: limit
  *         in: path
  *         description: max number of records to return at a time
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             center:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 location:
  *                   type: string
  *                 capacity:
  *                   type: integer
  *                 amount:
  *                   type: decimal
  *                 centerUrl:
  *                   type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "center": {
  *               "name": "Example Hall",
  *               "location": "Mount Everest",
  *               "capacity": 100,
  *               "amount": 1000.00,
  *               "userId": 1,
  *               "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *             }
  *
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
  *             "result": "Center not found!!!"
  *           }
  */

/**
  * @swagger
  * /api/v1/centers/{centerId}:
  *   put:
  *     summary: Updates a center's details
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
  *     parameters:
  *       - name: centerId
  *         in: path
  *         description: Center's Identification Number to be updated
  *         required: true
  *         type: integer
  *         format: int32
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
  *             - userId
  *             - centerUrl
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             capacity:
  *               type: integer
  *             amount:
  *               type: decimal
  *             userId:
  *               type: integer
  *             centerUrl:
  *               type: string
  *           example: {
  *             "name": "Example Hall",
  *             "location": "Mount Everest",
  *             "capacity": 100,
  *             "amount": 1000.00,
  *             "userId": 1,
  *             "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *           }
  *     responses:
  *       200:
  *         description: When center's details are updated
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             centerDetails:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 location:
  *                   type: string
  *                 capacity:
  *                   type: integer
  *                 amount:
  *                   type: decimal
  *                 centerUrl:
  *                   type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "center": {
  *               "name": "Example Hall",
  *               "location": "Mount Everest",
  *               "capacity": 100,
  *               "amount": 1000.00,
  *               "userId": 1,
  *               "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *             }
  *       }
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
  *             "result": "fails to update"
  *           }
  */

/**
  * @swagger
  * /api/v1/centers/:centerId:
  *   get:
  *     summary: Get a center
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
  *     parameters:
  *       - name: centerId
  *         in: path
  *         description: Center's Identification Number of center to query
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             center:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 location:
  *                   type: string
  *                 capacity:
  *                   type: integer
  *                 amount:
  *                   type: decimal
  *                 centerUrl:
  *                   type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "center": {
  *               "name": "Example Hall",
  *               "location": "Mount Everest",
  *               "capacity": 100,
  *               "amount": 1000.00,
  *               "userId": 1,
  *               "centerUrl": "https://dsfsknksghd@exa.com/fksfhkdgf.jpg"
  *             }
  *       }
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
  *             "result": "Center not found!!!"
  *           }
  */

/**
  * @swagger
  * /api/v1/center/{centerId}/{page}&{limit}:
  *   get:
  *     summary: Get a center's event details
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Centers
  *     parameters:
  *       - name: centerId
  *         in: path
  *         description: ID of the event to get
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: page
  *         in: path
  *         description: Number of records to skip
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: limit
  *         in: path
  *         description: max number of records to return
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
  *             totalNumPage:
  *               type: integer
  *             numOfPage:
  *               type: integer
  *             eventDetail:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "totalNumPage": 10,
  *             "numOfPage": 1,
  *             "eventDetail": {
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *
  *             }
  *           }
  *       404:
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
  *             "result": "No Center not found!!!"
  *           }
  */

