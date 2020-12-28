const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

//Get routes
router.get('/all', auth.isAuth, role.isSeller, ProductController.getAll);
router.get(
  '/bycategory',
  auth.isAuth,
  role.isSeller,
  ProductController.getByCategory
);
router.get('/bytype', auth.isAuth, role.isSeller, ProductController.getByType);
router.get(
  '/byprotectionlevel',
  auth.isAuth,
  role.isSeller,
  ProductController.getByProtectionLevel
);
router.get(
  '/byproductid/:id',
  auth.isAuth,
  role.isSeller,
  ProductController.getByProductId
);
router.get(
  '/byname',
  auth.isAuth,
  role.isSeller,
  ProductController.getByProductName
);
router.get('/byseller', auth.isAuth, role.isSeller); //TODO
router.get('/byseller/bycategory', auth.isAuth, role.isSeller); //TODO
router.get('/byprice', auth.isAuth, role.isSeller); //TODO
router.get('/bysales', auth.isAuth, role.isSeller); //TODO
router.get('/bystock', auth.isAuth, role.isSeller); //TODO

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
