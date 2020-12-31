const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.get('/all', auth.isAuth, role.isSeller, PurchaseController.getAll);
router.get('/mypurchases', auth.isAuth); //TODO: User can get his/her purchases
router.post('/mypurchases', auth.isAuth, PurchaseController.userAddPurchase); //User can buy if logged in
router.post(
  '/',
  auth.isAuth,
  role.isSeller,
  PurchaseController.sellerAddPurchase
); //Seller can add purchase on behalf a user
router.put(
  '/:purchase_id',
  auth.isAuth,
  role.isSeller,
  PurchaseController.editPurchase
); //Only a seller can edit a purchase
router.delete(
  '/:purchase_id',
  auth.isAuth,
  role.isSeller,
  PurchaseController.deletePurchase
); //Onle a seller can delete a purchase

module.exports = router;
