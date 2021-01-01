const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

/**
 * @swagger
 *
 * /users/register:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *         example: Paco
 *       - name: surname
 *         in: body
 *         required: true
 *         type: string
 *         example: Martínez
 *       - name: address
 *         in: body
 *         required: true
 *         type: Object
 *         properties:
 *           country:
 *             type: string
 *             example: Spain
 *           zipCode:
 *             type: string
 *             example: 28080
 *           city:
 *             type: string
 *             example: Madrid
 *           streetAddress:
 *             type: string
 *             example: Puerta del Sol, 1
 *       - name: phone
 *         in: body
 *         required: false
 *         type: integer
 *         example: 666555444
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *         example: email@email.com
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *         example: mysecurepassword
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             {
 *               message: User succesfully created,
 *               token,
 *               user
 *             }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             {
 *               message: 'There was a problem when trying to register a new user',
 *               error
 *             }
 */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', auth.isAuth, UserController.getProfile);
router.put('/profile', auth.isAuth, UserController.updateProfile);
router.delete('/profile', auth.isAuth, UserController.deleteProfile);
router.get('/all', auth.isAuth, role.isAdmin, UserController.getAll);
router.get('/id/:id', auth.isAuth, role.isAdmin, UserController.getById);
router.get(
  '/email/:email',
  auth.isAuth,
  role.isAdmin,
  UserController.getByEmail
);
router.put('/id/:id', auth.isAuth, role.isAdmin, UserController.update);
router.delete('/id/:id', auth.isAuth, role.isAdmin, UserController.delete);

module.exports = router;
