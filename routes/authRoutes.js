const router = require('express').Router()
const {signUpController,getUsers, getSingleUser} = require('../controllers/signupController')
const {loginUser} = require('../controllers/loginController')

// swagger config
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated user id
 *         name:
 *           type: string
 *           description: The name of the logged-in user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the logged-in user
 *         password:
 *           type: string
 *           description: The password of the logged-in user
 *       example:
 *         id: $2hhuhusudakp
 *         name: Safari
 *         email: muhadi@gmail.com
 *         password: huipi987We
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Returns a list of all the users
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated user id
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *
 *     NewUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *           format: password
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message
 *         code:
 *           type: integer
 *           description: The error code
 */


// Get and post user
router.route('/signup').get(getUsers).post(signUpController)

// Get single user route
router.route('/signup/:id').get(getSingleUser) 

// login routes
router.route('/login').post(loginUser)



module.exports = router