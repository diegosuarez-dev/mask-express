const Purchase = require('../models/Purchase');

const PurchaseController = {
  async getAll(req, res) {
    try {
      let filters = {};
      let sortedBy = {};
      if (req.body.date_range) {
        let dateRange = {};
        if (req.body.date_range.from) {
          dateRange.$gte = req.body.date_range.from;
        }
        if (req.body.date_range.to) {
          dateRange.$lte = req.body.date_range.to;
        }
        filters.date_range = dateRange;
      }
      if (req.body.user_id) {
        filters.user_id = req.body.user_id;
      }
      if (req.body.seller_id) {
        filters.seller_id = req.body.seller_id;
      }
      if (req.body.by_product) {
        filters.products.name = { $regex: req.body.by_product };
      }
      if (req.body.total) {
        let totalRange = {};
        if (req.body.total.min) {
          totalRange.$gte = req.body.total.min;
        }
        if (req.body.total.max) {
          totalRange.$lte = req.body.total.max;
        }
        filters.total = totalRange;
      }
      const purchases = await Purchase.find(filters).sort(sortedBy);
      res.send(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the purchases',
        error,
      });
    }
  },
};

module.exports = PurchaseController;
