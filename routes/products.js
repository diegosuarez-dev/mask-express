const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

//Get routes
router.get('/all', auth.isAuth, role.isSeller, ProductController.getAll);
router.get('/bycategory', auth.isAuth, role.isSeller);
router.get('/byseller', auth.isAuth, role.isSeller);
router.get('/byseller/bycategory', auth.isAuth, role.isSeller);
router.get('/byname', auth.isAuth, role.isSeller);
router.get('/byprice', auth.isAuth, role.isSeller);
router.get('/bysales', auth.isAuth, role.isSeller);
router.get('/bystock', auth.isAuth, role.isSeller);

//Post, put and delete routes
router.post(
  '/manage',
  auth.isAuth,
  role.isSeller,
  ProductController.createProduct
);
router.put(
  '/manage',
  auth.isAuth,
  role.isSeller,
  ProductController.updateProduct
);
router.delete(
  '/manage/:product_id',
  auth.isAuth,
  role.isSeller,
  ProductController.deleteProduct
);

module.exports = router;
