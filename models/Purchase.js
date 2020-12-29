const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
});

const PurchaseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
    products: [Product],
    subtotal: Number,
    total: Number,
  },
  {
    toJSON: { virtuals: true },
  }
);

PurchaseSchema.pre('save', function (next) {
  this.products.forEach((element) => {
    this.subtotal += element.price * element.units;
    this.total += element.price * element.units * 0.04;
  });
});

PurchaseSchema.pre('updateOne', function (next) {
  this._update.products.forEach((element) => {
    this._update.subtotal += element._update.price * element._update.units;
    this._update.total += element._update.price * element._update.units * 0.04;
  });
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;
