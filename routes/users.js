const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

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
