const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.get('/all', auth.isAuth, role.isSeller, PurchaseController.getAll); //Done, needs testing
router.get('/mypurchases', auth.isAuth); //User can get his/her purchases
router.post('/', auth.isAuth); //User can buy if logged in
router.put('/:purchase_id', auth.isAuth, role.isSeller); //Only a seller can edit a purchase
router.delete('/:purchase_id', auth.isAuth, role.isSeller); //Onle a seller can delete a purchase

module.exports = router;
