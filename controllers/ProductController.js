const Product = require('../models/Product');

const ProductController = {
  async getAll(req, res) {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get all products',
        error,
      });
    }
  },
  async createProduct(req, res) {
    try {
      const product = await Product.create({
        ...req.body,
        seller_id: req.user,
      });
      res.status(201).send({
        message: 'Product succesfully created',
        product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to create the product',
        error,
      });
    }
  },
  async updateProduct(req, res) {
    try {
      const result = await Product.updateOne({ _id: req.body._id }, req.body);
      const product = await Product.findById(req.body._id);
      if (!product) {
        return res.send({ message: 'Product not found in DB' });
      }
      res.send({ result, product });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to update the product',
        error,
      });
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.product_id);
      if (!product) {
        return res.send({ message: 'Product not found in DB' });
      }
      res.send({
        message: 'Product succesfully deleted from DB',
        product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to delete the product',
        error,
      });
    }
  },
};

module.exports = ProductController;
