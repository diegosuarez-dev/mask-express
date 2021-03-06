const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.get('/all', ProductController.getAll);
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
