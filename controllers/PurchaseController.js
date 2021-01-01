const Purchase = require('../models/Purchase');
const moment = require('moment');

const PurchaseController = {
  async getAll(req, res) {
    try {
      let filters = {};
      let sortedBy = {};
      if (req.body.date_range) {
        let dateRange = {};
        if (req.body.date_range.from) {
          dateRange.$gte = moment(req.body.date_range.from);
        }
        if (req.body.date_range.to) {
          dateRange.$lte = moment(req.body.date_range.to)
            .add(1, 'day')
            .subtract(1, 'millisecond');
        }
        filters.date = dateRange;
      }
      if (req.body.user_id) {
        filters.user_id = req.body.user_id;
      }
      if (req.body.seller_id) {
        filters.seller_id = req.body.seller_id;
      }
      if (req.body.by_product) {
        filters['products.name'] = { $regex: req.body.by_product };
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
      if (req.body.sorted) {
        req.body.sorted.forEach((element) => {
          switch (element.field) {
            case 'date':
              sortedBy.date = element.direction;
              break;
            case 'user_id':
              sortedBy.user_id = element.direction;
              break;
            case 'total':
              sortedBy.total = element.direction;
              break;
          }
        });
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
  async getMyPurchases(req, res) {
    try {
      let filters = {};
      let sortedBy = {};
      if (req.body.date_range) {
        let dateRange = {};
        if (req.body.date_range.from) {
          dateRange.$gte = moment(req.body.date_range.from);
        }
        if (req.body.date_range.to) {
          dateRange.$lte = moment(req.body.date_range.to)
            .add(1, 'day')
            .subtract(1, 'millisecond');
        }
        filters.date = dateRange;
      }
      if (req.body.by_product) {
        filters['products.name'] = { $regex: req.body.by_product };
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
      if (req.body.sorted) {
        req.body.sorted.forEach((element) => {
          switch (element.field) {
            case 'date':
              sortedBy.date = element.direction;
              break;
            case 'user_id':
              sortedBy.user_id = element.direction;
              break;
            case 'total':
              sortedBy.total = element.direction;
              break;
          }
        });
      }
      filters.user_id = req.user;
      const purchases = await Purchase.find(filters).sort(sortedBy);
      res.send(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get your purchases',
        error,
      });
    }
  },
  async userAddPurchase(req, res) {
    try {
      const purchase = await Purchase.create({
        date: new Date(),
        user_id: req.user,
        ...req.body,
      });
      res
        .status(201)
        .send({ message: 'Purchase succesfully created', purchase });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to confirm the purchase',
        error,
      });
    }
  },
  async sellerAddPurchase(req, res) {
    try {
      const purchase = await Purchase.create({
        date: new Date(),
        seller_id: req.user,
        ...req.body,
      });
      res
        .status(201)
        .send({ message: 'Purchase succesfully created', purchase });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to confirm the purchase',
        error,
      });
    }
  },
  async editPurchase(req, res) {
    try {
      const result = await Purchase.updateOne(
        { _id: req.params.purchase_id },
        req.body
      );
      const purchase = await Purchase.findById(req.params.purchase_id);
      if (!purchase) {
        return res.send({ message: 'Purchase not found in DB' });
      }
      res.send({ result, purchase });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to edit the purchase',
        error,
      });
    }
  },
  async deletePurchase(req, res) {
    try {
      const purchase = await Purchase.findByIdAndDelete(req.params.purchase_id);
      if (!purchase) {
        return res.send({ message: 'Purchase not found in DB' });
      }
      res.send({
        message: 'Purchase succesfully deleted from DB',
        purchase,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to delete the purchase',
        error,
      });
    }
  },
};

module.exports = PurchaseController;
