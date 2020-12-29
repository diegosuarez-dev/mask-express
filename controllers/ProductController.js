const Product = require('../models/Product');

const ProductController = {
  async getAll(req, res) {
    try {
      let filters = {};
      let sortedBy = {};
      if (req.body.product_id) {
        filters._id = req.body.product_id;
      }
      if (req.body.name) {
        filters.name = { $regex: req.body.name };
      }
      if (req.body.category) {
        filters.category = req.body.category;
      }
      if (req.body.type) {
        filters.type = req.body.type;
      }
      if (req.body.protection_level) {
        filters.protection_level = req.body.protection_level;
      }
      if (req.body.seller_id) {
        filters.seller_id = req.body.seller_id;
      }
      if (req.body.price) {
        let priceRange = {};
        if (req.body.price.min) {
          priceRange.$gte = req.body.price.min;
        }
        if (req.body.price.max) {
          priceRange.$lte = req.body.price.max;
        }
        filters.price = priceRange;
      }
      if (req.body.sorted) {
        req.body.sorted.forEach((element) => {
          switch (element.field) {
            case 'price':
              sortedBy.price = element.direction;
              break;
            case 'sales':
              sortedBy.sales = element.direction;
              break;
            case 'stock':
              sortedBy.stock = element.direction;
              break;
            case 'name':
              sortedBy.name = element.direction;
              break;
          }
        });
      }
      const products = await Product.find(filters).sort(sortedBy);
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the products',
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
