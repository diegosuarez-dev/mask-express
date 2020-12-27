const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.post('/', UserController.register);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.get('/email/:email', UserController.getByEmail);

module.exports = router;
