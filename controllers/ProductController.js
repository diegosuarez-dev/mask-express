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
  async getByCategory(req, res) {
    try {
      const products = await Product.find({
        category: req.body.category,
      }).exec();
      if (!products) {
        return res.send({
          message: 'There are no products to list in this category',
        });
      }
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the products',
        error,
      });
    }
  },
  async getByType(req, res) {
    try {
      const products = await Product.find({
        type: req.body.type,
      }).exec();
      if (!products) {
        return res.send({
          message: 'There are no products to list in this type',
        });
      }
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the products',
        error,
      });
    }
  },
  async getByProtectionLevel(req, res) {
    try {
      const products = await Product.find({
        protection_level: req.body.protection_level,
      }).exec();
      if (!products) {
        return res.send({
          message: 'There are no products to list with this protection level',
        });
      }
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the products',
        error,
      });
    }
  },
  async getByProductId(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.send({
          message: 'The product was not found',
        });
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the product',
        error,
      });
    }
  },
  async getByProductName(req, res) {
    try {
      const product = await Product.findOne({ name: req.body.name });
      if (!product) {
        return res.send({
          message: 'The product was not found',
        });
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the product',
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
